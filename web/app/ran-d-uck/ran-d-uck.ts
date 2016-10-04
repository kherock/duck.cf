import { Component } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'ran-d-uck',
  template: `
    <div class="duck-container">
        <img [src]="duckUrl">    
    </div>
    <div>
        <button md-raised-button color="accent" (click)="randuck()">Ran-d-uck</button>
    </div>
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

  get duckUrl(): string { return this.appState.get('duckUrl'); }
  set duckUrl(value: string) { this.appState.set('duckUrl', value); }

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.randuck();
  }

  randuck() {
    this.duckUrl = RanDuck.DUCK_URLS[Math.floor(Math.random() * RanDuck.DUCK_URLS.length)];
  }
}
