import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department } from '../../../models/department';
import { Category } from '../../../models/category';
import { DepartmentService } from '../../../services/department.service';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
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
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
  providers: [UserService, CategoryService, DepartmentService],
})
export class NewCategoryComponent implements OnInit {
  public page_title: string;
  public status: string;
  public category: Category;
  public token;
  public department: Department;
  public name;
  public id;
  public identity;
  public departments;
  public user;
  myControl = new FormControl();
  options: List[] = JSON.parse(localStorage.getItem('department-list'))
  filteredOptions: Observable<List[]>;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _departmentService: DepartmentService,
    private _userService: UserService,
  ) {
    this.page_title = "Nueva Categoría";
    this.category = new Category(1, 1, 1, '', '', '');
    this.department = new Department(1, 1, '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getDepartments();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status = 'success') {
          this.category = response.category;
          this.status = 'success';
          form.reset();

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

  getDepartments() {
    let departments = JSON.parse(localStorage.getItem('department-list'));
    this.departments = departments
  }

  private _filter(name: string): List[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  displayCompany(id): string {
    if (!id || this.options === null || this.options === undefined) {
      return '';
    } else {
      let index = this.options.findIndex(option => option.id === id);
      if (index > -1) {
        return this.options[index].name;
      } else { return ''; }
    }
  }
}
