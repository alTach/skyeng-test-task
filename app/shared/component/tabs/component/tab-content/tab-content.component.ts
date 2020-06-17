import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
