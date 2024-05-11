import {Injectable, OnInit} from '@angular/core';
import {TabComponent} from "../component/tab/tab.component";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from "rxjs";
import {TabTitleComponent} from "../component/tab-title/tab-title.component";
import {map} from "rxjs/operators";

@Injectable()
export class TabsService implements OnInit {
  private tabList: ReplaySubject<TabComponent[]>;
  public tabList$: Observable<TabComponent[]>;
  private activeTabTitle: BehaviorSubject<TabTitleComponent>;
  public activeTabTitle$: Observable<TabTitleComponent | null>;
  public activeTab$ = this.createActiveTab(this.activeTabTitle$, this.tabList$);

  constructor() {}

  public ngOnInit() {
    const tabList = new ReplaySubject<TabComponent[]>(1);
    const activeTabTitle = new BehaviorSubject<TabTitleComponent>(null)
    this.tabList = tabList;
    this.tabList$ = tabList.asObservable();
    this.activeTabTitle = activeTabTitle;
    this.activeTabTitle$ = activeTabTitle.asObservable();
    this.activeTab$ = this.createActiveTab(this.activeTabTitle$, this.tabList$);
  }

  public updateTabList(tabList: Array<TabComponent>) {
    this.tabList.next(tabList);
  }

  public setActiveTab(tabTitle: TabTitleComponent) {
    this.activeTabTitle.next(tabTitle);
  }

  private createActiveTab(activeTabTitle$: Observable<TabTitleComponent>, tabList$: Observable<TabComponent[]>): Observable<TabComponent> {
    return combineLatest<[TabTitleComponent, TabComponent[]]>([activeTabTitle$, tabList$]).pipe(
        map(([activeTabTitle, tabList]) => {
          return  tabList.find(tab => tab.tabTitle === activeTabTitle) || tabList[0];
        }),
    )
  }
}
