import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Department} from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css'],
  providers: [DepartmentService, UserService],
  
})
export class NewDepartmentComponent implements OnInit {
  public page_title: string;
  public status: string;
  public department: Department;
  public token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
  ) { 
    this.page_title = "Nuevo Departamento";
    this.department = new Department(1,1,'','','');
    this.token      = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._departmentService.create(this.token, this.department).subscribe(
      response => {
        if(response.status ='success'){
          this.department=response.department;
          this.status= 'success';
          
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

}
