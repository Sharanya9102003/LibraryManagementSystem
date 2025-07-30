

import { Routes, CanActivateFn } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
// import { LoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { LandingComponent } from './landing/landing.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {IssueReturnComponent} from './issue-return/issue-return.component'
import { authGuard } from './auth.guard';
 
import { FineManagementComponent } from './fine-management/fine-management.component';
 
 
export const routes: Routes = [
    { path: '', component: LandingComponent },
   
 
    {
      path: '',
      component: MasterComponent,
     
      children: [
        { path: 'home', component: HomeComponent, canActivate:[authGuard] },
        { path: 'aboutus', component: AboutusComponent , canActivate:[authGuard]},
        { path: 'books', component: LibraryComponent, canActivate:[authGuard] },
        { path: 'user-management', component: UserManagementComponent, canActivate:[authGuard] },
        { path: 'issue-return', component: IssueReturnComponent, canActivate:[authGuard] },
        {path:'fine-management',component:FineManagementComponent, canActivate:[authGuard]}
      ]
    },
 
    { path: 'register', component: RegisterComponent }
  ];
 
 
 
