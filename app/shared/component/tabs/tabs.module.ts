import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsComponent} from "./component/tabs/tabs.component";
import {TabComponent} from "./component/tab/tab.component";
import {TabTitleComponent} from "./component/tab-title/tab-title.component";
import {TabContentComponent} from "./component/tab-content/tab-content.component";
import {TabsService} from "./service/tabs.service";


@NgModule({
  declarations: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent],
  exports: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent],
  providers: [TabsService],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
