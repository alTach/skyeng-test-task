import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {TabsService} from "../../service/tabs.service";
import { DestroyService } from "../../service/destroy.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css'],
  providers: [DestroyService],
})
export class TabTitleComponent implements OnInit {

  @HostListener('click') onClick() {
    this.tabsService.setActiveTab(this);
  }
  constructor(
      private tabsService: TabsService,
      private renderer: Renderer2,
      private elRef: ElementRef,
      public destroy$: DestroyService,
      ) { }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement, 'tabs__title')

    this.tabsService.activeTab$.pipe(takeUntil(this.destroy$)).subscribe(activeTab => {
      this.toggleActiveClass(activeTab && activeTab.tabTitle === this);
    })
  }

  toggleActiveClass(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.elRef.nativeElement, 'tabs__title--active')
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'tabs__title--active')
    }
  }

}
