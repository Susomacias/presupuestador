import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Element } from '../../models/element';
import { ElementService } from '../../services/element.service';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { global } from '../../services/global.service';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, ElementService, ArticleService, CategoryService, DepartmentService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public user: User;
  public startElement: boolean;
  public startArticle: boolean;
  public startDepartment: boolean;
  public startCategory: boolean;
  public element: Element;
  public elements: Array<Element>;
  public article: Article;
  public articles: Array<Article>;
  public category: Category;
  public categories: Array<Category>;
  public department: Department;
  public departments: Array<Department>;
  public identity;
  public token;
  public status: string;
  public id;
  public keyframe;


  constructor(
    private _userService: UserService,
    private _elementService: ElementService,
    private _articleService: ArticleService,
    private _departmentService: DepartmentService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private rest: UserService,

  ) {
    this.element = new Element(null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
    this.article = new Article(1, 1, 1, 1, '', '', '');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (!this.user) {
      localStorage.setItem('cover', 'true');
    }
  }

  ngOnInit(): void {
    this.animationCover('pdf');
    this.animationCover('budguet1');
    this.animationCover('budguet2');
    this.animationCover('budguet3');
    this.animationCover('article');
    this.animationCover('lot');
    this.animationCover('service');
    this.animationCover('panel');
    this.animationCover('cutpanel1');
    this.animationCover('cutpanel2');
    this.animationCover('cutpanel3');
    this.animationCover('cutpanel4');
    this.animationCover('cutpanel5');
    this.animationCover('cutpanel6');
    this.animationCover('cutcoil1');
    this.animationCover('cutcoil2');
    this.animationCover('cutcoil3');
    this.animationCover('cutcoil4');
    this.animationCover('cutcoil5');
    this.animationCover('cutcoil6');

    if (!this.user) {
      localStorage.setItem('cover', 'false');
    }

    this.loadUser();
    if (this.user) {
      this.getElements();
      this.getArticles();
      this.getCategories();
      this.getDepartments();
    }
  }

  loadUser() {
    this.user = this._userService.getIdentity();
  }

  getElements() {
    this._elementService.getList(this.token, this.identity).subscribe(
      response => {
        this.elements = response;
        this.status = "success";
        if (this.status && this.elements && this.elements.length == 0) {
          this.startElement = true;
          document.documentElement.style.overflow = 'hidden';
        } else {
          this.startElement = false;
          document.documentElement.style.overflow = 'auto';
        }
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }

  getArticles() {
    this._articleService.getList(this.token, this.identity).subscribe(
      response => {
        this.articles = response;
        this.status = "success";
        if (this.elements && this.elements.length != 0 && this.articles && this.articles.length == 0) {
          this.startArticle = true;
          document.documentElement.style.overflow = 'hidden';
        } else {
          this.startArticle = false;
          document.documentElement.style.overflow = 'auto';
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getDepartments() {
    this._departmentService.getList(this.token, this.identity).subscribe(
      response => {
        this.departments = response;
        this.status = "success";
        if (this.departments && this.departments.length != 0) {
          this.startDepartment = true;
        } else {
          this.startDepartment = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategories() {
    this._categoryService.getList(this.token, this.identity).subscribe(
      response => {
        this.categories = response;
        this.status = "success";
        if (this.categories && this.categories.length != 0) {
          this.startCategory = true;
        } else {
          this.startCategory = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  ModalElement() {
    this.startElement = false;
    document.documentElement.style.overflow = 'auto';
  }

  ModalArticles() {
    this.startArticle = false;
    document.documentElement.style.overflow = 'auto';
  }

  animationCover(a) {
    window.addEventListener('scroll', function () {
      let prueba2=a;
      let animation = document.getElementById(a);
      if (animation) {
        let positionObj1 = animation.getBoundingClientRect().top;

        let sizescreen = this.window.innerHeight / 2;

        if (positionObj1 < sizescreen) {
          animation.style.animation =prueba2+" 10s linear"
        }
        animation.addEventListener("animationend", animationEnd);

        function animationEnd(e) {
          animation.style.animation = 'none';
          animation.offsetHeight;
          animation.style.animation = null;
        }
      }
    })
  }

}








