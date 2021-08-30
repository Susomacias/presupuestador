import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Element } from '../../../models/element';
import { ElementService } from '../../../services/element.service';
import { Feature } from '../../../models/feature';
import { FeatureService } from '../../../services/feature.service';
import { FeaturesByArticleService } from '../../../services/featuresbyarticle.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { Row } from '../../../models/row';
import { RowService } from '../../../services/row.service';
import { Budguet } from '../../../models/budguet';
import { BudguetService } from '../../../services/budguet.service';
import { RowsByBudguetService } from '../../../services/rowsbybudguet';
import {MatExpansionModule} from '@angular/material/expansion';
import { browser } from 'protractor';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { features } from 'node:process';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [
    UserService,
    RowService,
    BudguetService,
    DepartmentService,
    ArticleService,
    ElementService,
    FeatureService,
    FeaturesByArticleService,
    RowsByBudguetService],
})
export class ArticleDetailComponent implements OnInit {

  panelOpenState = false;

  public status: string;
  public name;
  public element_id;
  public article_id;
  public identity;
  public token;
  public article: Article;
  public articles;
  public row: Row;
  public user: User;
  public element: Element;
  public elements: Array<Element>;
  public feature: Feature;
  public features: Array<Feature>;
  public loading: boolean;
  public condition_a: boolean;
  public condition_b: boolean;
  public department: Department;
  public departments: Array<Department>;
  public budguet: Budguet;
  public id_budguet;
  public suma;
  public rows;
  public select;
  public multipleIsChecked: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _departmentService: DepartmentService,
    private _articleService: ArticleService,
    private _elementService: ElementService,
    private _featureService: FeatureService,
    private _featuresbyarticleService: FeaturesByArticleService,
    private _rowService: RowService,
    private _budguetService: BudguetService,
    private _rowsByBudguetService: RowsByBudguetService,
  ) {
    this.department = new Department(1, 1, '', '', '');
    this.article = new Article(1, 1, 1, 1, '', '', '');
    this.element = new Element(null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
    this.feature = new Feature(null, null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null,null);
    this.budguet = new Budguet(1, 1, 1, null, 'Presupuesto', '', 1, 1, 1);
    this.row = new Row(null,null,null,null,null,null,null,null,null);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.element_id = this.element.id;
    this.id_budguet = localStorage.getItem('budguet');
    this.row.budguet_id = this.id_budguet;
    this.select = false;
    this.multipleIsChecked = false;
    this.element.surface_article_layout = "horizontal";
    this.element.surface_layout = "horizontal";
    this.element.coil_article_layout="horizontal";
    this.row.amount=1;
    
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
    this._route.params.subscribe(params => {
      this.article_id = params['id'];
      this.getFeatureByArticle();
    });
    this.getBudguetRows()
    this.getElements();
    this.loadUser();
    this.row.tax=this.user.taxes;
    this.getArticle();   
  }
  

  loadUser() {
    this.user = this._userService.getIdentity();
  }



  getArticle() {
    this.loading = true;
    this.addUp('add');
    let id = this.article_id;
    this._articleService.getArticle(id).subscribe(
      response => {
        this.article = response.article;
        this.row.name=this.article.name;
        this.row.description=this.article.description;
        this.status = "success";
        this.getFeatureByArticle();
        this.loading=true;
        this.loading=false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

  deleteFeature(form) {
    this._featureService.delete(this.token, form);
    this.getArticle();
    this.getElements();
    this.getFeatureByArticle();
  }

  updateFeature(form) {
    this._featureService.update(this.token, form);
    this.getArticle();
    this.getElements();
    this.getFeatureByArticle();
  }

  getElements() {
    this.loading = true;
    this._elementService.getList(this.token, this.identity).subscribe(
      response => {
        this.elements = response;
        this.addUp('add');        
        this.status = "success";
        this.loading=true;
        this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }
  getFeatureByArticle() {
    let id = { "id": this.article_id };
    this.loading = true;
    this._featuresbyarticleService.getList(this.token, id).subscribe(
      response => {
        this.features = response;
        this.getBudguetRows();
        this.status = "success";
          this.getElements();
          this.loading=true;
          this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

  getBudguetRows() {
    let budguet = JSON.parse(localStorage.getItem('budguet-detail'));
    if (budguet && budguet != "undefined"){
    //let id = { "id": this.id_budguet };
    let id = budguet.id
    this._rowsByBudguetService.getList(this.token, id).subscribe(
      response => {
        this.rows = response;
        localStorage.setItem('row-' + this.id_budguet + '-list', JSON.stringify(this.rows));
        this.status = "success";
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
    }
  }


  addFeature(form) {
    this.loading = true;
    this._featureService.createfromelement(this.token, form).subscribe(
      response => {
        if (response.status = 'success') {
          this.feature = response.features;
          this.status = 'success';
          this.getFeatureByArticle();
          this.loading=true;
          this.loading = false;       
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

  addUp(add) {
    this.loading = true;
    let elementos = document.getElementsByClassName(add);
    let total = 0;
    Array.prototype.forEach.call(elementos, function (el) {
      total += Number.parseFloat(el.value);
    });
    this.row.price = total;
    this.row.total=(this.row.price+((this.row.tax * this.row.price) / 100))
    this.loading = false;
  }

  onSubmit(form) {
    this.loading=true;
    let budguet = JSON.parse(localStorage.getItem('budguet-detail'));
    if (budguet && budguet != "undefined") {
      this.id_budguet = budguet.id;
      this.row.budguet_id=this.id_budguet;
    this._rowService.create(this.token, this.row).subscribe(
      response => {
        if (response.status = 'success') {
          this.row = response.row;
          this.getBudguetRows();//para añadir cantidad de articulos de presupuesto a la navbar
          this.status = 'success';
          this.loading=false;
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
        this.loading=false;
      }
    )
    }else{
      this._budguetService.create(this.token, this.budguet).subscribe(
        response => {
          if (response.status = 'success') {
            this.budguet = response.budguet;
            localStorage.setItem('budguet-detail',JSON.stringify(this.budguet));
            this.budguet = JSON.parse(localStorage.getItem('budguet-detail'));
            this.id_budguet = this.budguet.id;
            this.row.budguet_id=this.id_budguet;
            this.status = 'success';
    this._rowService.create(this.token, this.row).subscribe(
      response => {
        if (response.status = 'success') {
          this.row = response.row;
          this.getBudguetRows();//para añadir cantidad de articulos de presupuesto a la navbar
          this.status = 'success';
          this.loading=false;
        } else {
          this.status = 'error';
          this.loading=false;
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
        this.loading=false;
      }
    )
          } else {
            this.status = 'error';
            this.loading=false;
          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
          this.loading=false;
        }
      )
    }
  }
  budguetLink() {
    this._router.navigate(['/detalle-presupuesto/' + this.id_budguet]);
  }
}
