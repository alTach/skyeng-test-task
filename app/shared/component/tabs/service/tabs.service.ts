import {Injectable} from '@angular/core';
import {TabComponent} from "../component/tab/tab.component";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from "rxjs";
import {TabTitleComponent} from "../component/tab-title/tab-title.component";
import {map} from "rxjs/operators";

@Injectable()
export class TabsService {
  private tabList = new ReplaySubject<TabComponent[]>(1);
  public tabList$ = this.tabList.asObservable();
  public activeTabTitle$ = new BehaviorSubject<TabTitleComponent>(null);
  public activeTab$ = this.createActiveTab(this.activeTabTitle$, this.tabList$);

  constructor() {
  }

  public updateTabList(tabList: Array<TabComponent>) {
    this.tabList.next(tabList);
  }

  public setActiveTab(tabTitle: TabTitleComponent) {
    this.activeTabTitle$.next(tabTitle);
  }

  private createActiveTab(activeTabTitle$: Observable<TabTitleComponent>, tabList$: Observable<TabComponent[]>): Observable<TabComponent> {
    return combineLatest<[TabTitleComponent, TabComponent[]]>([activeTabTitle$, tabList$]).pipe(
        map(([activeTabTitle, tabList]) => {
          return  tabList.find(tab => tab.tabTitle === activeTabTitle) || tabList[0];
        }),
    )
  }
}
