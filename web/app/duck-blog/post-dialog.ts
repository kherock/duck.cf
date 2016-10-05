import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

interface PostForm {
   title: string,
   body: string
}

@Component({
   selector: 'post-dialog',
   template: `
   <form (submit)="dialogRef.close(model)">
      <md-input placeholder="Title" required [(ngModel)]="model.title" name="title"></md-input>
      <md-input placeholder="Body" required [(ngModel)]="model.body" name="body"></md-input>
      <button md-button type="submit">Submit</button>
   </form>
   `
})
export class PostDialog {
   model: PostForm = {title: '', body: ''};
   constructor(public dialogRef: MdDialogRef<PostDialog>) {}
}
