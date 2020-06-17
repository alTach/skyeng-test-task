import {AfterContentInit, Component, ContentChild, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabsService} from "../../service/tabs.service";
import {Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {
  subscriptions: Array<Subscription> = []

  tabTitleTemplates$ = this.tabsService.tabList$.pipe(map(tabs => tabs.map(tab => tab.titleTemplate)));
  activeTab$ = this.tabsService.activeTab$;
  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;
  constructor(private tabsService: TabsService) { }

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


