import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'ran-d-uck',
  template: `
    <audio [src]="quackSrc" autoplay></audio>
    <figure class="duck" *ngIf="duckUrl$ | async; let duckUrl">
        <div [style.width]="duckUrl.width + 'px'">
            <img #leDuck
                [src]="duckUrl.url"
                (click)="quack($event)">
            <div [style.paddingBottom]="100 * duckUrl.height / duckUrl.width + '%'"></div>
        </div>
    </figure>
    <div class="button-container">
        <button md-raised-button
            color="accent"
            (click)="buttonClick$.next($event)">
            Ran-d-uck
        </button>
    </div>
  `,
  styleUrls: ['ran-d-uck.scss']
})
export class RanDuck {
  static DUCK_REDDIT = 'https://www.reddit.com/r/duck/.json?count=25';

  buttonClick$ = new Subject();
  duckUrl$ = Observable.of({ url: '' }).concat(this.buttonClick$.
      switchMap(() => this.http.get(RanDuck.DUCK_REDDIT)).
      map(res => res.json()).
      map((json) => {
        const posts = json.data.children.filter((post: any) => post.data.preview);
        const post = posts[Math.floor(Math.random() * posts.length)].data.preview.images[0].source;
        return post;
      }));
  quackSrc = 'assets/quack0.mp3';

  @ViewChild('leDuck') leDuck: ElementRef;

  constructor(public http: Http) { }

  ngAfterViewInit() {
    this.buttonClick$.next();
  }

  @HostListener('document: mousemove', ['$event.clientX', '$event.clientY'])
  onmousemove(clientX: number, clientY: number) {
    const dX = window.innerWidth / 2 - clientX;
    const dY = window.innerHeight / 2 - clientY;
    const distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    const ratio = Math.atan(distance) / 64;
    this.leDuck.nativeElement.style.transform = 'translate(' + (-dX * ratio) + 'px,' + (-dY * ratio) + 'px)';
  }

  quack({ clientX }: MouseEvent) {
    // object-fit: contain; creates empty space around the img
    const { offsetWidth, offsetHeight, naturalWidth, naturalHeight } = this.leDuck.nativeElement;
    const padding = (offsetWidth - offsetHeight * naturalWidth / naturalHeight) / 2;
    const rect = this.leDuck.nativeElement.getBoundingClientRect();
    if (clientX < rect.left + padding || clientX > rect.left + rect.width - padding) return;

    this.quackSrc = 'assets/quack' + (Math.floor(Math.random() * 3)) + '.mp3';
    ga('send', 'event', 'Interaction', 'quack');
  }
}
