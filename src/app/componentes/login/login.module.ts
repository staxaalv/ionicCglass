import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  //declarations: [LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ]/*,
  exports: [LoginComponent]*/
})
export class LoginModule { }
