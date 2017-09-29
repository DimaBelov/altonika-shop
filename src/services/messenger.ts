import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-messenger',
    template: '<div><span>{{data.message}}</span></div>'
})
export class MessengerComponent {

    constructor(
        public dialogRef: MdDialogRef<MessengerComponent>, 
        @Inject(MD_DIALOG_DATA) public data: any) {

    }
}

export class Messenger {

    constructor(@Inject(MdDialog) private _dialog: MdDialog) {

    }

     show(message: string) {
        this._dialog.open(MessengerComponent, {data: {message: message}});
    }
}


