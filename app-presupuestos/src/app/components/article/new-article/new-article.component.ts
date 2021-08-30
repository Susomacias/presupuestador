import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department} from '../../../models/department';
import { Category} from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { Article} from '../../../models/article';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface List {
  name: string;
  id: string;
}

@Component({
selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
  providers: [UserService, CategoryService, DepartmentService, ArticleService],
})
export class NewArticleComponent implements OnInit {
  public page_title: string;
  public status: string;
  public article: Article;
  public category: Category;
  public department: Department;
  public token;
  public name;
  public id;
  public identity;
  public departments;
  public articles;
  public categories;
  public user;

  ControlDepartments = new FormControl();
  departmentsList: List[] = JSON.parse(localStorage.getItem('department-list'));
  filteredDepartments: Observable<List[]>;

  ControlCategories = new FormControl();
  categoriesList: List[] = JSON.parse(localStorage.getItem('category-list'));
  filteredCategories: Observable<List[]>;



  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _articleService: ArticleService,
  ) { 
    this.page_title = "Nuevo Artículo";
    this.article = new Article(null,null,null,null,'','','');
    this.department = new Department(1,1,'','','');
    this.category = new Category(1,1,1,'','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getDepartments();
    this.filteredDepartments = this.ControlDepartments.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterDepartments(name) : this.departmentsList.slice())
    );



  }

  onSubmit(form){
    this._articleService.create(this.token, this.article).subscribe(
      response => {
        if(response.status ='success'){
          this.article=response.article;
          this.status= 'success';
          form.reset();
          
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  getDepartments(){
    let departments = JSON.parse(localStorage.getItem('department-list'));
    this.departments= departments;
  }

  getCategories(){
    let categories = JSON.parse(localStorage.getItem('category-list'));
    this.categories= categories;
    this.filteredCategories = this.ControlCategories.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCategories(name) : this.categoriesList.slice())
    );
  }
  
  private _filterDepartments(name: string): List[] {
    const filterValue = name.toLowerCase();

    return this.departmentsList.filter(department => department.name.toLowerCase().includes(filterValue));
  }


  displayDepartments(id): string {
    if (!id || this.departmentsList === null || this.departmentsList === undefined) {
      return '';
    } else {
      let index = this.departmentsList.findIndex(department => department.id === id);
      if (index > -1) {
        return this.departmentsList[index].name;
      } else { return ''; }
    }
  }

  private _filterCategories(name: string): List[] {
    const filterValue = name.toLowerCase();

    return this.categoriesList.filter(category => category.name.toLowerCase().includes(filterValue));
  }


  displayCategories(id): string {
    if (!id || this.categoriesList === null || this.categoriesList === undefined) {
      return '';
    } else {
      let index = this.categoriesList.findIndex(category => category.id === id);
      if (index > -1) {
        return this.categoriesList[index].name;
      } else { return ''; }
    }
  }
}
