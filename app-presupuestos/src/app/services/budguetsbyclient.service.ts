import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { Budguet} from '../models/budguet';
import { Client} from '../models/client';
import { Row} from '../models/row';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class BudguetsByClientService extends ServiceBase<Budguet> {    
 
    private id;
    constructor(
        _http: HttpClient
    ) {
        super(_http, 'budguet/client');
    }

    setClient(id: Number) {
        this.id = id;
        this.keyHash = 'budguet-' + this.id + '-hash';
        this.keyValues = 'budguet-' + this.id + '-list';
        this.init();
    }

    public getList(token, identity): Observable<Array<Budguet>> {
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
            this.setClient(identity.id);
        }
        return super.getList(token, identity);
    }
}