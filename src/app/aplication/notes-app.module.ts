import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotesAppProfileComponent } from './notes-app-profile/notes-app-profile.component';
import { NotesRoutingModule } from './notes-routing.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    NotesAppComponent,
    NotesAppProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NotesRoutingModule,
    PrimengModule,
    FormsModule
  ]
})
export class NotesAppModule { }
