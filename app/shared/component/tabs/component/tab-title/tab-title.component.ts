import {Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TabsService} from "../../service/tabs.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  @HostListener('click') onClick() {
    this.tabsService.setActiveTab(this);
  }
  constructor(
      private tabsService: TabsService,
      private renderer: Renderer2,
      private elRef: ElementRef
      ) { }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement, 'tabs__title')

    this.subscription.add(
        this.tabsService.activeTab$.subscribe(activeTab => {
          this.toggleActiveClass(activeTab && activeTab.tabTitle === this);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleActiveClass(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.elRef.nativeElement, 'tabs__title--active')
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'tabs__title--active')
    }
  }

}
