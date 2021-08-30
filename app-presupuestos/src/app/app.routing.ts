//IMPORTS NECESARIOS
import { Route } from '@angular/compiler/src/core';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { IdentityGuard} from './services/identity.guard';
import { from } from 'rxjs';

//IMPORTS COMPONENTES
import {HomeComponent} from './components/home/home.component';

import {ContactComponent} from './components/user/contact/contact.component';
import {CookieLawComponent} from './components/user/cookie-law/cookie-law.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ErrorComponent} from './components/user/error/error.component';
import {ChangePasswordComponent} from './components/user/change-password/change-password.component';
import {PasswordRecoveriComponent} from './components/user/password-recoveri/password-recoveri.component';

import {NewDepartmentComponent} from './components/department/new-department/new-department.component';
import {ListDepartmentComponent} from './components/department/list-department/list-department.component';
import {ContentsDepartmentComponent} from './components/department/contents-department/contents-department.component';

import {NewCategoryComponent} from './components/category/new-category/new-category.component';
import {ListCategoryComponent} from './components/category/list-category/list-category.component';
import {ContentsCategoryComponent} from './components/category/contents-category/contents-category.component';

import {NewArticleComponent} from './components/article/new-article/new-article.component';
import {ListArticleComponent} from './components/article/list-article/list-article.component';
import {ArticleDetailComponent} from './components/article/article-detail/article-detail.component';

import {NewElementComponent} from './components/element/new-element/new-element.component';
import {ListElementComponent} from './components/element/list-element/list-element.component';
import {DetailElementComponent} from './components/element/detail-element/detail-element.component';

import {NewClientComponent} from './components/client/new-client/new-client.component';
import {ListClientComponent} from './components/client/list-client/list-client.component';
import {DetailClientComponent} from './components/client/detail-client/detail-client.component';

import {NewBudguetComponent} from './components/budguet/new-budguet/new-budguet.component';
import {ListBudguetComponent} from './components/budguet/list-budguet/list-budguet.component';
import {DetailBudguetComponent} from './components/budguet/detail-budguet/detail-budguet.component';

//DEFINIR LAS RUTAS
const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},

    //USUARIO
    {path: 'contacto', component:ContactComponent},
    {path: 'politica-de-privacidad', component:CookieLawComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'ajustes', component:UserEditComponent,canActivate: [IdentityGuard]},
    {path: 'password', component: ChangePasswordComponent,canActivate: [IdentityGuard]},
    {path: 'passwordrecoveri', component: PasswordRecoveriComponent},
    
    //DEPARTAMENTO
    {path: 'nuevo-departamento', component:NewDepartmentComponent,canActivate: [IdentityGuard]},
    {path: 'departamentos', component:ListDepartmentComponent,canActivate: [IdentityGuard]},
    {path: 'contenido-departamento/:id', component:ContentsDepartmentComponent,canActivate: [IdentityGuard]},

     //CATEGORIA
    {path: 'nueva-categoria', component:NewCategoryComponent,canActivate: [IdentityGuard]},
    {path: 'categorias', component:ListCategoryComponent,canActivate: [IdentityGuard]},
    {path: 'contenido-categoria/:id', component:ContentsCategoryComponent,canActivate: [IdentityGuard]},

    //ARTICULOS
    {path: 'nuevo-articulo', component:NewArticleComponent,canActivate: [IdentityGuard]},
    {path: 'articulos', component:ListArticleComponent,canActivate: [IdentityGuard]},
    {path: 'detalle-articulo/:id', component:ArticleDetailComponent,canActivate: [IdentityGuard]},

    //ELEMENTOS
    {path: 'nuevo-elemento', component:NewElementComponent,canActivate: [IdentityGuard]},
    {path: 'elementos', component:ListElementComponent,canActivate: [IdentityGuard]},
    {path: 'detalle-elemento/:id', component:DetailElementComponent,canActivate: [IdentityGuard]},

    //CLIENTES
    {path: 'nuevo-cliente', component:NewClientComponent,canActivate: [IdentityGuard]},
    {path: 'clientes', component:ListClientComponent,canActivate: [IdentityGuard]},
    {path: 'detalle-cliente/:id', component:DetailClientComponent,canActivate: [IdentityGuard]},

    //PRESUPUESTOS
    {path: 'nuevo-presupuesto', component:NewBudguetComponent,canActivate: [IdentityGuard]},
    {path: 'presupuestos', component:ListBudguetComponent,canActivate: [IdentityGuard]},
    {path: 'detalle-presupuesto/:id', component:DetailBudguetComponent,canActivate: [IdentityGuard]},



   // canActivate: [IdentityGuard]
    
    
    /*EJEMPLO PADRE E HIJO
    {path: ':year/:id', component: YearDetailComponent,
    children: [
        {path: 'meses/:id', component: MesDetailComponent},
    ]},*/
   {path: '**', component: ErrorComponent}, //esta tiene que estar de ultima!!
];

//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
