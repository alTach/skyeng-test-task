import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import {TabsModule} from "./shared/component/tabs/tabs.module";

@NgModule({
  imports:      [ BrowserModule, FormsModule,  TabsModule],
  declarations: [ AppComponent, TestComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
