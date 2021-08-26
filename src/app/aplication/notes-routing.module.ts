import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { NotesAppProfileComponent } from './notes-app-profile/notes-app-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotesAppComponent
      },
      {
        path: 'profile',
        component: NotesAppProfileComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotesRoutingModule { }
