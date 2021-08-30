import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { UserService } from '../../../services/user.service';
import { Budguet } from '../../../models/budguet';
import { BudguetService } from '../../../services/budguet.service';
import { BudguetsByClientService } from '../../../services/budguetsbyclient.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css'],
  providers: [ClientService, UserService,BudguetService,BudguetsByClientService],
})
export class DetailClientComponent implements OnInit {
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
  public budguet: Budguet;
  public budguets: Array<Budguet>;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _userService: UserService,
    private _budguetService: BudguetService,
    private _budguetsByClientService:BudguetsByClientService,
  ) { 
    this.client =  new Client(1, 1, '', '', '', '', '', '', '');
    this.budguet = new Budguet(1,1,1, 4,'','',1,1,1);
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getClientBudguets();
      this.getClient();
    });
    this._budguetService.isBusy().subscribe(response => {
      this.loading = response;
    })
  }

  getClientBudguets() {
    let id = { "id": this.id };
  
      //Peticion ajas para sacar los datos del post
      this._budguetsByClientService.getList(this.token, id).subscribe(
        response => {
          this.budguets = response;
          this.status = "success";
          this.loading = false;
        }, error => {
          console.error(error);
          this.status = "error";
        }
      );
    }



  updateBudguet(form) {
    this._budguetService.update(this.token, form);
  }

  deleteBudguet(form) {
    this._budguetService.delete(this.token, form);
  }

  getClient() {
    let id = this.id;
    this._clientService.getClient(id).subscribe(
      response => {
        this.client = response.client;
        this.status = "success";
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

}
