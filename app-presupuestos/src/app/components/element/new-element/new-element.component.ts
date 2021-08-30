import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department } from '../../../models/department';
import { Category } from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';
import { ElementService } from '../../../services/element.service';
import { Element } from '../../../models/element';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-new-element',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.css'],
  providers: [UserService, CategoryService, DepartmentService, ArticleService, ElementService],
})
export class NewElementComponent implements OnInit {

  public multipleIsChecked: boolean;
  public wholeIsChecked: boolean;
  public page_title: string;
  public status: string;
  public user: User;
  public article: Article;
  public category: Category;
  public department: Department;
  public element: Element;
  public token;
  public name;
  public id;
  public identity;
  public departments;
  public articles;
  public categories;
  public elements;
  public select;
  public loading:boolean;
  public message:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _articleService: ArticleService,
    private _elementService: ElementService,
  ) {
    this.page_title = "Nuevo Material o Proceso";
    this.user = new User(1, '', '', '', '', '', '', '', '', 1, '', '');
    this.article = new Article(1, 1, 1, 1, '', '', '');
    this.department = new Department(1, 1, '', '', '');
    this.category = new Category(1, 1, 1, '', '', '');
    this.element = new Element(null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.select = false;
    this.multipleIsChecked = false;
    this.element.surface_article_layout = "horizontal";
    this.element.surface_layout = "horizontal";
    this.element.coil_article_layout="horizontal";
    this.wholeIsChecked = false
    this.element.unit_profitpercentage=0;
    this.element.surface_profitpercentage=0;
    this.element.coil_profitpercentage=0;


    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.email, '',
      this.identity.image,
      this.identity.newpassword,
      this.identity.address,
      this.identity.phone,
      this.identity.web,
      this.identity.taxes,
      this.identity.measure,
      this.identity.coin,
    );
    this.element.unit_measurement = this.user.measure;


  }

  ngOnInit(): void {
    this.loadUser();
  }


  loadUser() {
    this.user = this._userService.getIdentity();
  }

  onSubmit(form) {
    this.loading=true;
    this.message=false;
    this._elementService.create(this.token, this.element).subscribe(
      response => {
        if (response.status = 'success') {
          this.element = response.element;
          this.status = 'success';
          this.loading=false;
          this.select=false;
          this.message=true;
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  wholeCheck() {
    let element = <HTMLInputElement>document.getElementById("swhole");
    let isChecked = element.checked;

    if (isChecked) {
      this.wholeIsChecked = true;
      this.element.surface_whole = "yes"

    } else {
      this.wholeIsChecked = false;
    }
  }

  //UNIT//////////////////////////////
  selectUnit() {
    this.select = (<HTMLInputElement>document.getElementById("unit")).value;
  }

  unitCostPriceCal() {
    this.element.unit_costprice = (this.element.unit_price * 100) / (100 + this.element.unit_profitpercentage);
  }

  unitPriceCal() {
    let percentage = (this.element.unit_profitpercentage * this.element.unit_costprice) / 100;
    this.element.unit_price = this.element.unit_costprice + percentage;
  }


  //SURFACE//////////////////////////////
  selectSurface() {
    this.select = (<HTMLInputElement>document.getElementById("surface")).value;
  }

  surfaceCostPriceCal() {
    this.element.surface_profitpercentage = (this.element.surface_price / this.element.surface_costprice) * 100;
  }

  surfacePriceCal() {
    let percentage = (this.element.surface_profitpercentage * this.element.surface_costprice) / 100;
    this.element.surface_price = this.element.surface_costprice + percentage;
  }

  surfaceSlide() {
    this.element.surface_multiple = this.multipleIsChecked;
  }

  SurfaceAmountCal() {
    if(this.multipleIsChecked == false){
      this.element.surface_multiple_amount=1
    }

    let surfaceWidth;
    let surfaceHeight;
    let articleWidth;
    let articleHeight;

    surfaceWidth = this.element.surface_width;
    surfaceHeight = this.element.surface_height;

    if (surfaceWidth >= surfaceHeight) {
      this.element.surface_layout = 'horizontal'
    }
    if (surfaceWidth < surfaceHeight) {
      this.element.surface_layout = 'vertical'
    }

    articleWidth = this.element.surface_article_width;
    articleHeight = this.element.surface_article_height;

    if (articleWidth >= articleHeight) {
      this.element.surface_article_layout = 'horizontal'
    }
    if (articleWidth < articleHeight) {
      this.element.surface_article_layout = 'vertical'
    }

    let articlesAcross = Math.trunc(surfaceWidth / articleWidth);
    let articlesAlong = Math.trunc(surfaceHeight / articleHeight);

    this.element.surface_itens = articlesAcross * articlesAlong;

    if (this.element.surface_itens == 0) {
      let articlesAcross = surfaceWidth / articleWidth;
      let articlesAlong = surfaceHeight / articleHeight;

      this.element.surface_itens = articlesAcross * articlesAlong;

      if (this.element.surface_itens != null) {
        this.element.surface_whole = "yes"
      }
    }

    if(this.wholeIsChecked == true){
      this.element.surface_total_surfaces = Math.ceil(this.element.unit_amount / this.element.surface_itens);
    }
    if(this.wholeIsChecked == false){
      this.element.surface_total_surfaces = this.element.unit_amount / this.element.surface_itens;
    }

    if (this.multipleIsChecked==false) {
      let costArticle = this.element.surface_surcharge_item * this.element.unit_amount;
      let costSurface = this.element.surface_individual_cost * this.element.surface_total_surfaces;

      this.element.surface_costprice = costArticle + costSurface;
    }

    if (this.multipleIsChecked==true) {
      let costArticle = this.element.surface_surcharge_item * this.element.unit_amount;
      let costSurface = (this.element.surface_individual_cost/this.element.surface_multiple_amount) * this.element.surface_total_surfaces;

      this.element.surface_costprice = costArticle + costSurface;
    }

  }

  surfaceLayaut(){
    let surfaceWidth = this.element.surface_width;
    let surfaceHeight = this.element.surface_height;

    if (this.element.surface_layout == 'vertical') {
      this.element.surface_width=surfaceHeight;
      this.element.surface_height=surfaceWidth;
    }
    if (this.element.surface_layout == 'horizontal') {
      this.element.surface_width=surfaceHeight;
      this.element.surface_height=surfaceWidth;
    }
  }

  surfaceArticleLayaut(){
    let articleWidth = this.element.surface_article_width;
    let articleHeight = this.element.surface_article_height;

    if (this.element.surface_article_layout == 'vertical') {
      this.element.surface_article_width=articleHeight;
      this.element.surface_article_height=articleWidth;
    }
    if (this.element.surface_article_layout == 'horizontal') {
      this.element.surface_article_width=articleHeight;
      this.element.surface_article_height=articleWidth;
    }
  }

  //COIL//////////////////////////////
  selectCoil() {
    this.select = (<HTMLInputElement>document.getElementById("coil")).value;
  }

  CoilAmountCal(){
    let articleWidth = this.element.coil_article_width;
    let articleHeight = this.element.coil_article_height;

    if (articleWidth >= articleHeight) {
      this.element.coil_article_layout = 'horizontal'
    }
    if (articleWidth < articleHeight) {
      this.element.coil_article_layout = 'vertical'
    }

    let columns=Math.trunc(this.element.coil_width/this.element.coil_article_width);
    let rows = Math.trunc(this.element.unit_amount/columns);

    this.element.coil_total_measure=rows*this.element.coil_article_height

    if (this.element.coil_total_measure==0){
      this.element.coil_total_measure=this.element.coil_article_height
    }

    let costArticle = this.element.coil_surcharge_item*this.element.unit_amount;
    let costCoil = this.element.coil_measured_cost*this.element.coil_total_measure;

    this.element.coil_costprice= costArticle + costCoil;
  }

  coilCostPriceCal() {
    this.element.coil_profitpercentage = (this.element.coil_price / this.element.coil_costprice) * 100;
  }

  coilPriceCal() {
    let percentage = (this.element.coil_profitpercentage * this.element.coil_costprice) / 100;
    this.element.coil_price = this.element.coil_costprice + percentage;
  }

  coilArticleLayaut(){
    let articleWidth = this.element.coil_article_width;
    let articleHeight = this.element.coil_article_height;

    if (this.element.coil_article_layout == 'vertical') {
      this.element.coil_article_width=articleHeight;
      this.element.coil_article_height=articleWidth;
    }
    if (this.element.coil_article_layout == 'horizontal') {
      this.element.coil_article_width=articleHeight;
      this.element.coil_article_height=articleWidth;
    }
  }

}

