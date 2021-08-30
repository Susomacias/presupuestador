import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article} from '../models/article';
import { Element} from '../models/element';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class ElementService extends ServiceBase<Element>{
    public url: string;
    
 
    constructor(
        _http: HttpClient
    ){
        super(_http, 'element');
    }

    getElement(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'detail/'+id, {headers: headers});
    }
}