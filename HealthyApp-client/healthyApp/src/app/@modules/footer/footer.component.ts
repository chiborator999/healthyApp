import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getPrivacy() {
    console.log("Privacy");
  }

  getTerms() {
    console.log("Terms");
  }

  getFAQ() {
    console.log("FAQ");
  }
}
