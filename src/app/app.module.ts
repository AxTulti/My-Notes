import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// To use primeng's animations, we have to import the `BrowserAnimationsModule`
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

// Prime Ng
// Ripple effect
import { PrimengModule } from './shared/primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotesAppModule } from './aplication/notes-app.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Prime Ng
    PrimengModule,

    // Shared elements
    SharedModule,
    AppRouterModule,
    AuthenticationModule,
    NotesAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
