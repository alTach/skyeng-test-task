import {Injectable} from '@angular/core';
import {TabComponent} from "../component/tab/tab.component";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from "rxjs";
import {TabTitleComponent} from "../component/tab-title/tab-title.component";
import {map} from "rxjs/operators";

@Injectable()
export class TabsService {
  tabList$ = new ReplaySubject<TabComponent[]>(1);
  activeTabTitle$ = new BehaviorSubject<TabTitleComponent>(null);
  activeTab$ = this.createActiveTab(this.activeTabTitle$, this.tabList$);

  constructor() {
  }

  updateTabList(tabList: Array<TabComponent>) {
    this.tabList$.next(tabList);
  }

  setActiveTab(tabTitle: TabTitleComponent) {
    this.activeTabTitle$.next(tabTitle);
  }

  private createActiveTab(activeTabTitle$: Observable<TabTitleComponent>, tabList$: Observable<TabComponent[]>) {
    return combineLatest<[TabTitleComponent, TabComponent[]]>([activeTabTitle$, tabList$]).pipe(
        map(([activeTabTitle, tabList]) => {
          return  tabList.find(tab => tab.tabTitle === activeTabTitle) || tabList[0];
        }),
    )
  }
}
