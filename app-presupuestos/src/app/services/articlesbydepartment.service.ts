import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { Article} from '../models/article';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class ArticlesByDepartmentService extends ServiceBase<Article> { 
        private id;
        constructor(
            _http: HttpClient
        ) {
            super(_http, 'article/department');
        }
    
        setDepartment(id: Number) {
            this.id = id;
            this.keyHash = 'article-' + this.id + '-hash';
            this.keyValues = 'article-' + this.id + '-list';
            this.init();
        }
    
        public getList(token, identity): Observable<Array<Article>> {
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
                this.setDepartment(identity.id);
            }
            return super.getList(token, identity);
        }
    
}