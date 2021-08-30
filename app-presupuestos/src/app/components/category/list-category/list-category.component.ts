import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department } from '../../../models/department';
import { Category } from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
  providers: [DepartmentService, UserService, CategoryService],
})
export class ListCategoryComponent implements OnInit {
  public page_title: string;
  public status: string;
  public department: Department;
  public category: Category;
  public name;
  public id;
  public identity;
  public token;
  public departments;
  public departmentList;
  public categories;
  public user;
  public departmentslocal;
  public loading:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _categoryService: CategoryService,
  ) {
    this.page_title = "Nueva Categoría";
    this.category = new Category(1,1,1, '', '', '');
    this.department = new Department(1,1, '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getDepartments();
    this._categoryService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getCategories() {
    this._categoryService.getList(this.token, this.identity).subscribe(
      response => {
        this.categories = response;
        this.status = "success";
        this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }

  updateCategories(form) {
    this._categoryService.update(this.token, form);
  }

  deleteCategory(form) {
    this._categoryService.delete(this.token, form);
  }

  getDepartments(){
    let departments = JSON.parse(localStorage.getItem('department-list'));
    this.departments= departments
  }

}
