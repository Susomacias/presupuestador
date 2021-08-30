import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article} from '../models/article';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { Budguet} from '../models/budguet';
import { Client} from '../models/client';
import { Row} from '../models/row';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class ClientService extends ServiceBase<Client>{
    public url: string;
    
 
    constructor(
        _http: HttpClient
    ){
        super(_http, 'client');
    }

    getClient(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'detail/'+id, {headers: headers});
    }
}