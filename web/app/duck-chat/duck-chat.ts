import { Component, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Api } from '../core';

@Component({
  selector: 'duck-chat',
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
      <button md-fab
          (click)="openNewThreadDialog(newThreadDialog)">
          <md-icon fontIcon="add"></md-icon>
      </button>
      <ng-template #newThreadDialog>
          <h1 md-dialog-title>Create thread</h1>
          <form (ngSubmit)="createThread()">
              <div md-dialog-content>
                  <md-input-container>
                      <input mdInput
                          name="title"
                          [(ngModel)]="threadForm.title"
                          required
                          placeholder="Title"
                      />
                  </md-input-container>
                  <md-input-container>
                      <input mdInput
                          name="body"
                          [(ngModel)]="threadForm.body"
                          required
                          placeholder="Body"
                      />
                  </md-input-container>
              </div>
              <div md-dialog-actions>
                  <button md-button
                      type="button"
                      (click)="threadDialogRef.close()">
                      Cancel
                  </button>
                  <button md-button
                      type="submit">
                      Submit
                  </button>
              </div>
          </form>
      </ng-template>
  `,
  styleUrls: ['./duck-chat.scss']
})
export class DuckChat {

  threadForm = { title: '', body: '' };
  threadDialogRef: MdDialogRef<any>;

  constructor(public api: Api, public mdDialog: MdDialog) { }

  openNewThreadDialog(dialogTemplateRef: TemplateRef<any>) {
    this.threadDialogRef = this.mdDialog.open(dialogTemplateRef);
    this.threadDialogRef.afterClosed().subscribe(() => {
      this.threadForm = { title: '', body: '' };
    });
  }

  createThread() {
    console.log(this.threadForm);
    this.threadDialogRef.close();
  }
}
