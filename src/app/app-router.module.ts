import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './authentication/register/register.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([  
      { path: '', pathMatch: 'full', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'app',
        loadChildren: () => import('../app/aplication/notes-app.module').then(m => m.NotesAppModule)
      },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
