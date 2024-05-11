import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public tabs = [ 1, 2 ];

  public remove() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public add() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }
}
