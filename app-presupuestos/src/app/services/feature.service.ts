import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Element } from '../models/element';
import { Feature } from '../models/feature';
import { Department } from '../models/department';
import { Category } from '../models/category';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class FeatureService extends ServiceBase<Feature>{
    public url: string;
    
 
    constructor(
        _http: HttpClient
    ){
        super(_http, 'feature');
    }

    createfromelement(token, data): Observable<any>{
        let json = JSON.stringify(data);
        let params = new FormData();
        params.append('json', json);

        let headers = new HttpHeaders().set('Authorization', token);
        
        return this._http.post(this.url + 'createfromelement', params, {headers: headers});
    } 
}
