import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from './primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { NotesHeaderComponent } from './notes-header/notes-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotesHeaderComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotesHeaderComponent
  ]
})
export class SharedModule { }
