import {AfterContentInit, Component, TemplateRef, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabsService} from "../../service/tabs.service";
import { Observable } from "rxjs";
import { TabTitleComponent } from "../tab-title/tab-title.component";
import { map, takeUntil } from "rxjs/operators";
import { DestroyService } from "../../service/destroy.service";

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  providers: [DestroyService],
})
export class TabsComponent implements AfterContentInit {
  public tabTitleTemplates$: Observable<TemplateRef<TabTitleComponent>[]>;
  public activeTab$: Observable<TabComponent>;

  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;

  constructor(private tabsService: TabsService, public destroy$: DestroyService,) {
    this.tabTitleTemplates$ = this.tabsService.tabList$.pipe(map(tabs => tabs.map(tab => tab.titleTemplate)));
    this.activeTab$ = this.tabsService.activeTab$;
  }

  ngAfterContentInit(): void {
    this.tabList.changes.pipe(takeUntil(this.destroy$)).subscribe((tabList: QueryList<TabComponent>) => {
      this.tabsService.updateTabList(tabList.toArray());
    })
    this.tabList.notifyOnChanges();
  }
}


