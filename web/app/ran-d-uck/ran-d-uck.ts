import { Component } from '@angular/core';

@Component({
  selector: 'ran-d-uck',
  template: `
    <img [src]="duckUrl">
    <div>
        <button md-raised-button (click)="randuck()">Ran-d-uck</button>
    </div>
    <a routerLink="/ascii">How about an ascii duck?</a>
  `,
  styleUrls: ['ran-d-uck.scss']
})
export class RanDuck {
  static DUCK_URLS: string[] = [
    'http://web.stanford.edu/dept/CTL/cgi-bin/academicskillscoaching/wp-content/uploads/2012/07/baby-duck.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Domestic-crested-duck-CamdenME.jpg',
    'http://i2.cdn.turner.com/cnnnext/dam/assets/130924135602-taiwan-duck-5-horizontal-large-gallery.jpg',
    'http://luckyduckrescue.org/IMG_0049.jpg',
    'http://c3405147.r47.cf0.rackcdn.com/waterfowlID/fullSize/1/blackbelliedwhistlingduck1.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/aa/9f/62/aa9f62a5dedeb3dfe733362b3f0ee885.jpg',
    'http://notyourmommascookie.com/wp-content/uploads/2012/02/confused-duck.jpg',
    'http://www.permacultureproject.com/wp-content/uploads/2011/01/Paranoid-Duck-large.jpg'
  ];
  duckUrl: string = this.randuck();

  randuck() {
    return this.duckUrl = RanDuck.DUCK_URLS[Math.floor(Math.random() * RanDuck.DUCK_URLS.length)];
  }
}