import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department} from '../models/department';
import { Category} from '../models/category';
import { Article} from '../models/article';
import { Feature} from '../models/feature';
import { global } from './global.service';
import { ServiceBase } from './servicebase';


@Injectable()
export class FeaturesByArticleService extends ServiceBase<Feature> { 
        private id;
        constructor(
            _http: HttpClient
        ) {
            super(_http, 'feature/article');
        }
    
        setArticle(id: Number) {
            this.id = id;
            this.keyHash = 'feature-' + this.id + '-hash';
            this.keyValues = 'feature-' + this.id + '-list';
            this.init();
        }
    
        public getList(token, identity): Observable<Array<Feature>> {
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
                this.setArticle(identity.id);
            }
            return super.getList(token, identity);
        }
    
}