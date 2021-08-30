import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { global } from '../../../services/global.service';
import { Budguet } from '../../../models/budguet';
import { BudguetService } from '../../../services/budguet.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface List {
  name: string;
  id: string;
}

@Component({
  selector: 'app-new-budguet',
  templateUrl: './new-budguet.component.html',
  styleUrls: ['./new-budguet.component.css'],
  providers: [BudguetService, UserService, ClientService],
})
export class NewBudguetComponent implements OnInit {
  public page_title: string;
  public status: string;
  public budguet: Budguet;
  public client: Client;
  public clients: Array<Client>;
  public id_budguet;
  public token;
  public name;
  public id;
  public identity;
  public departments;
  public budguets;
  public user: User;
  public loading: boolean;
  public message: boolean;

  public price;
  public price_status;
  public price_status_control;
  public data_client;
  public pdf_row;
  public pdf_columns;
  

  myControl = new FormControl();
  options: List[] = JSON.parse(localStorage.getItem('client-list'))
  filteredOptions: Observable<List[]>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _budguetService: BudguetService,
    private _userService: UserService,
    private _clientService: ClientService,
  ) {
    this.budguet = new Budguet(1,1,1, null,'','',1,1,1);
    this.client = new Client(1, 1, '', '', '', '', '', '', '');
    this.token = this._userService.getToken();
    this.data_client = JSON.parse(localStorage.getItem('client-detail'));
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.id_budguet = localStorage.getItem('budguet');
    this.budguet.id = this.id_budguet;
    this.user = this._userService.getIdentity();
    this.budguet.tax=this.user.taxes;

  }

  ngOnInit(): void {
    this.getClients();
    this._clientService.isBusy().subscribe(response => {
      this.loading = response;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  onSubmit(form) {
    this.loading=true;
    this.message=false;
    let id_budguet = JSON.parse(localStorage.getItem('budguet-detail'));
    if(id_budguet){
      this.id_budguet=id_budguet.id;
      localStorage.removeItem('budguet-detail');
      localStorage.removeItem('budguet');
      localStorage.removeItem('row-' + this.id_budguet + '-list');
      localStorage.removeItem('row-' + this.id_budguet + '-hash');
      localStorage.removeItem('row-' + this.id_budguet + '-pdf-list');
    }
    this._budguetService.create(this.token, this.budguet).subscribe(
      response => {
        if (response.status = 'success') {
          this.budguet = response.budguet;
          this.id_budguet=response.budguet.id;
          localStorage.setItem('budguet',JSON.stringify(this.id_budguet));
          localStorage.setItem('budguet-detail', JSON.stringify(this.budguet));
          this.status = 'success';
          this.loading=false;
          this.message=true;
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

  getClients() {
    this.loading = true;
    this._clientService.getList(this.token, this.identity).subscribe(
      response => {
        this.clients = response;
        this.status = "success";
        this.loading = false;
        localStorage.setItem('client-list', JSON.stringify(this.clients));
        this.options = JSON.parse(localStorage.getItem('client-list'));
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }

  getClient() {
      this._clientService.getClient(this.budguet.client_id).subscribe(
        response => {
          this.client = response.client;
          localStorage.setItem('client-detail', JSON.stringify(this.client));
          this.status = "success";
        }, error => {
          console.error(error);
          this.status = "error";
        }
      );
  }

  updateClient(form) {
    this._clientService.update(this.token, form);
  }

  updateBudguet(form) {
    this._budguetService.update(this.token, form);
    let id = this.id;
    this._budguetService.getBudguet(id).subscribe(
      response => {
        this.budguet = response.budguet;
        localStorage.setItem('budguet-detail', JSON.stringify(this.budguet));
        this.getClient();
        this.status = "success";
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
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
