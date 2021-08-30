import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department} from '../../../models/department';
import { Category} from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { ArticleService } from '../../../services/article.service';
import { Article} from '../../../models/article';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
  providers: [DepartmentService, UserService, CategoryService,ArticleService],
})
export class ListArticleComponent implements OnInit {
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
  public article: Article;
  public articles;
  public loading:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _articleService: ArticleService,
  ) { 
    this.page_title = "Listado de articulos";
    this.article = new Article(1,1,1,1,'','','');
    this.category = new Category(1,1,1,'','','');
    this.department = new Department(1,1,'','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.getDepartments();
    this.getArticles();
    this._articleService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getArticles(){
    this._articleService.getList(this.token, this.identity).subscribe(
      response => {
        this.articles = response;
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateArticle(form) {
    this._articleService.update(this.token, form);
  }

  deleteArticle(form) {
    this._articleService.delete(this.token, form);
  }

  getDepartments(){
    let departments = JSON.parse(localStorage.getItem('department-list'));
    this.departments= departments;
  }

  getCategories(){
    let categories = JSON.parse(localStorage.getItem('category-list'));
    this.categories= categories;
  }

}
