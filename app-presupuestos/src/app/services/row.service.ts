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
export class RowService extends ServiceBase<Row>{
    public url: string;
    
 
    constructor(
        _http: HttpClient
    ){
        super(_http, 'row');
    }

    deleteRow(token, data): Observable<any>{
        let json = JSON.stringify(data);
        let params = new FormData();
        params.append('json', json);

        let headers = new HttpHeaders().set('Authorization', token);
        
        return this._http.post(this.url + 'delete', params, {headers: headers});
    } 

}