import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class CategoryService extends ServiceBase<Category> {    
 
    constructor(
        _http: HttpClient
    ) {
        super(_http, 'category');
    }
    getCategory(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'detail/'+id, {headers: headers});
    }
}



