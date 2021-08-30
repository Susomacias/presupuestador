import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  providers: [ClientService, UserService],
})
export class ListClientComponent implements OnInit {
  public page_title: string;
  public status: string;
  public client: Client;
  public name;
  public id;
  public identity;
  public token;
  public clients: Array<Client>;
  public user;
  public loading:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _userService: UserService,
  ) {
    this.page_title = "Listado de clientes";
    this.client =  new Client(1, 1, '', '', '', '', '', '', '');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getClients();
    this._clientService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getClients() {
    this.loading= true;
    this._clientService.getList(this.token, this.identity).subscribe(
      response => {
        this.clients = response;
        this.status = "success";
        this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }


  updateClient(form) {
    this._clientService.update(this.token, form);
  }

  deleteClient(form) {
    this._clientService.delete(this.token, form);
  }

}