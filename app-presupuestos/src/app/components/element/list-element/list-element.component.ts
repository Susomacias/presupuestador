import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../services/global.service';
import { Element } from '../../../models/element';
import { ElementService } from '../../../services/element.service';
import { UserService } from '../../../services/user.service';
import { EMLINK } from 'node:constants';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css'],
  providers: [UserService, ElementService],

})
export class ListElementComponent implements OnInit {

  public page_title: string;
  public status: string;
  public element: Element;
  public name;
  public id;
  public identity;
  public token;
  public elements: Array<Element>;
  public user;
  public loading: boolean;
  public starter: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _elementService: ElementService,
    private _userService: UserService,
  ) {
    this.page_title = "Listado de departamentos";
    this.element = new Element(null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.starter = true;
  }

  ngOnInit(): void {
    this.getElements();
    this._elementService.isBusy().subscribe(response => {
      this.loading = response;
    });
    this.starterElement();
  }

  getElements() {
    this.loading = true;
    this._elementService.getList(this.token, this.identity).subscribe(
      response => {
        this.elements = response;
        this.status = "success";
        this.loading = false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }


  updateElement(form) {
    this._elementService.update(this.token, form);
  }

  deleteElement(form) {
    this._elementService.delete(this.token, form);
  }


  sumar(clase) {
    let elementos = document.getElementsByClassName(clase);
    let total = 0;
    Array.prototype.forEach.call(elementos, function (el) {
      total += Number.parseFloat(el.value);
    });
  }

  starterElement(){
    if(this.elements && this.elements.length == 0){
      this.starter = true;     
    }
    if(this.elements && this.elements.length != 0){
      this.starter = false;
    }
  }

}