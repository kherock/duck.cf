import { Component } from '@angular/core';

@Component({
  selector: 'ran-d-uck',
  template: `
    <img [src]="duckUrl">
    <div>
        <button md-raised-button disableRipple color="primary" (click)="randuck()">Duck</button>
    </div>
  `,
  styleUrls: ['ran-d-uck.scss']
})
export class RanDuck {
  static DUCK_URLS: string[] = [
    'http://web.stanford.edu/dept/CTL/cgi-bin/academicskillscoaching/wp-content/uploads/2012/07/baby-duck.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Domestic-crested-duck-CamdenME.jpg',
    'http://i2.cdn.turner.com/cnnnext/dam/assets/130924135602-taiwan-duck-5-horizontal-large-gallery.jpg'
  ];
  duckUrl: string = this.randuck();

  randuck() {
    return this.duckUrl = RanDuck.DUCK_URLS[Math.floor(Math.random() * RanDuck.DUCK_URLS.length)];
  }
}
