import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
  providers: [DepartmentService, UserService],

})
export class ListDepartmentComponent implements OnInit {

  public page_title: string;
  public status: string;
  public department: Department;
  public name;
  public id;
  public identity;
  public token;
  public departments: Array<Department>;
  public user;
  public loading:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
  ) {
    this.page_title = "Listado de departamentos";
    this.department = new Department(1, 1, '', '', '');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getDepartments();
    this._departmentService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getDepartments() {
    this.loading= true;
    this._departmentService.getList(this.token, this.identity).subscribe(
      response => {
        this.departments = response;
        this.status = "success";
        this.loading = false;

      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }


  updateDepartment(form) {
    this._departmentService.update(this.token, form);
  }

  deleteDepartment(form) {
    this._departmentService.delete(this.token, form);
  }
  sumar(clase) {
    let elementos = document.getElementsByClassName(clase);
    let total = 0;
    Array.prototype.forEach.call(elementos, function(el) {
      total += Number.parseFloat(el.value);
    }); 
  }

}
