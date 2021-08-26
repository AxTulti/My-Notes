import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    PrimengModule,
    SharedModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    MessageService
  ]
})
export class AuthenticationModule { }
