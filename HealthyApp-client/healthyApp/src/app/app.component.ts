import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-home></app-home>
  <router-outlet></router-outlet>
  <app-footer></app-footer>`,
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'healthyApp';
}
