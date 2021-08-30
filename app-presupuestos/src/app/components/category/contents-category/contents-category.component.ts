import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department } from '../../../models/department';
import { Category } from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { ArticleService } from '../../../services/article.service';
import { CategoriesByDepartmentService } from '../../../services/categoriesbydepartment.service';
import { ArticlesByDepartmentService } from '../../../services/articlesbydepartment.service';
import { ArticleByCategoryService } from '../../../services/articlesbycategory.service';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-contents-category',
  templateUrl: './contents-category.component.html',
  styleUrls: ['./contents-category.component.css'],
  providers: [DepartmentService, UserService, CategoryService, ArticleService, CategoriesByDepartmentService,ArticleByCategoryService],
})
export class ContentsCategoryComponent implements OnInit {
  public page_title: string;
  public status: string;
  public department: Department;
  public category: Category;
  public name;
  public id;
  public identity;
  public token;
  public departments;
  public categories;
  public user;
  public loading: boolean;
  public article: Article;
  public articles;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _articleService: ArticleService,
    private _categoriesbydepartmentService: CategoriesByDepartmentService,
    private _articlebydepartmentService: ArticleByCategoryService,
  ) {
    this.page_title = "Nueva Categoría";
    this.category = new Category(1, 1,1, '', '', '');
    this.department = new Department(1, 1, '', '', '');
    this.article = new Article(1,1,1,1,'','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getCategoryArticles();
      this.getCategory();
    });
    this.getCategories();
  }


  getCategoryArticles() {
    let id = { "id": this.id };
  
      //Peticion ajas para sacar los datos del post
      this._articlebydepartmentService.getList(this.token, id).subscribe(
        response => {
          this.articles = response;
          this.status = "success";
          this.loading = false;
        }, error => {
          console.error(error);
          this.status = "error";
        }
      );
    }

  updateArticle(form) {
    this._articleService.update(this.token, form);
  }

  deleteArticle(form) {
    this._articleService.delete(this.token, form);
  }

  getDepartments(){
    let departments = JSON.parse(localStorage.getItem('department-list'));
    this.departments= departments
  }

  getCategories(){
    let categories = JSON.parse(localStorage.getItem('category-list'));
    this.categories= categories;
  }

  getCategory() {
    let id = this.id;
    this._categoryService.getCategory(id).subscribe(
      response => {
        this.category = response.category;
        this.status = "success";
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

}
