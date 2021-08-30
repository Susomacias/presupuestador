import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
  providers: [ClientService, UserService],
})
export class NewClientComponent implements OnInit {
  public page_title: string;
  public status: string;
  public client: Client;
  public token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _userService: UserService,
  ) {
    this.client = new Client(1, 1, '', '', '', '', '', '', '');
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._clientService.create(this.token, this.client).subscribe(
      response => {
        if (response.status = 'success') {
          this.client = response.client;
          this.status = 'success';

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

}
