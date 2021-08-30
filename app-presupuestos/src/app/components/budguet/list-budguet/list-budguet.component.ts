import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Budguet } from '../../../models/budguet';
import { BudguetService } from '../../../services/budguet.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-budguet',
  templateUrl: './list-budguet.component.html',
  styleUrls: ['./list-budguet.component.css'],
  providers: [UserService, BudguetService],
})
export class ListBudguetComponent implements OnInit {
  public page_title: string;
  public status: string;
  public budguet: Budguet;
  public name;
  public id;
  public identity;
  public token;
  public budguets: Array<Budguet>;
  public user;
  public loading:boolean;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _budguetService: BudguetService,
    private _userService: UserService,
  ) {
    this.page_title = "Listado de budguetes";
    this.budguet = new Budguet(1,1,1, 4,'','',1,1,1);
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getBudguets();
    this._budguetService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getBudguets() {
    this.loading= true;
    this._budguetService.getList(this.token, this.identity).subscribe(
      response => {
        this.budguets = response;
        this.status = "success";
        this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }


  updateBudguet(form) {
    this._budguetService.update(this.token, form);
  }

  deleteBudguet(form) {
    this._budguetService.delete(this.token, form);
  }

  resetLocalSotorage(){
    let budguet = JSON.parse(localStorage.getItem('budguet-detail'));
    let id_budguet = budguet.id;
    localStorage.removeItem('row-' + id_budguet + '-list');
    localStorage.removeItem('row-' + id_budguet + '-hash');
    localStorage.removeItem('row-' + id_budguet + '-pdf-list');
    localStorage.removeItem('budguet-detail');
    localStorage.removeItem('budguet');
  }

}
