import {AfterContentInit, Component, TemplateRef, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabsService} from "../../service/tabs.service";
import { Observable, Subscription } from "rxjs";
import { TabTitleComponent } from "../tab-title/tab-title.component";
import { map } from "rxjs/operators";

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {
  subscriptions: Array<Subscription> = []

  tabTitleTemplates$: Observable<TemplateRef<TabTitleComponent>[]>;
  activeTab$: Observable<TabComponent>;
  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;
  constructor(private tabsService: TabsService) {
    this.tabTitleTemplates$ = this.tabsService.tabList$.pipe(map(tabs => tabs.map(tab => tab.titleTemplate)));
    this.activeTab$ = this.tabsService.activeTab$;
  }

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.subscriptions.push(
        this.tabList.changes.subscribe((tabList: QueryList<TabComponent>) => {
          this.tabsService.updateTabList(tabList.toArray());
        })
    );
    this.tabList.notifyOnChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}


