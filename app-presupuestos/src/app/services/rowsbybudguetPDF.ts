import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { Budguet} from '../models/budguet';
import { Row} from '../models/row';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class RowsByBudguetPDFService extends ServiceBase<Row> {    
 
    private id;
    constructor(
        _http: HttpClient
    ) {
        super(_http, 'row/budguetpdf');
    }

    setBudguet(id: Number) {
        this.id = id;
        this.keyHash = 'row-' + this.id + '-hash';
        this.keyValues = 'row-' + this.id + '-list';
        this.init();
    }

    public getList(token, identity): Observable<Array<Row>> {
        if(typeof identity == 'number') {
            identity = {
                'id': identity
            };
        } else if(identity == null) {
            identity = {};
        }
        if(typeof identity.id == 'undefined') {
            identity.id = this.id;
        } else {
            this.setBudguet(identity.id);
        }
        return super.getList(token, identity);
    }
}