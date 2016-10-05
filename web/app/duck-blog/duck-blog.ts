import { Component, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { PostDialog } from './post-dialog';

import { DuckAPI } from '../core/api';

@Component({
   selector: 'duck-blog',
   template: `
   <md-card>
      <md-card-title>Quack!</md-card-title>
      <md-card-content>
         Quack!
      </md-card-content>
      <md-card-actions>
         <button md-button>QUACK!</button>
      </md-card-actions>
   </md-card>
   <button md-fab (click)="postDialog($event)">
      <md-icon class="md-24">add</md-icon>
   </button>
   `,
   styleUrls: ['duck-blog.scss']
})
export class DuckBlog {
   lastCloseResult: string;
   constructor(public duckAPI: DuckAPI, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {}

   postDialog(event): void {
      const config = new MdDialogConfig();
      config.viewContainerRef = this.viewContainerRef;

      const dialogRef = this.dialog.open(PostDialog, config);

      dialogRef.afterClosed().subscribe((result) => {
         this.lastCloseResult = result;
      });
   }
}
