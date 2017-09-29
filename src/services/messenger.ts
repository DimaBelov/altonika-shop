import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-messenger',
    template: 
        '<div [ngStyle]="data.style">' + 
            '<md-icon [ngStyle]="{color: data.iconColor, float: \'left\'}">{{data.icon}}</md-icon>' +
            '<span style="height: 24px; line-height: 24px;">{{data.message}}</span>' +
        '</div>'
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

    showInfo(message: string) {
        this._dialog.open(MessengerComponent,
            {
                data: {
                    message: message,
                    icon: 'info', /* error_outline */
                    iconColor: 'dodgerblue'
                }
            }
        );
    }

    showSuccess(message: string) {
        this._dialog.open(MessengerComponent,
            {
                data: {
                    message: message,
                    icon: 'check',  /* check_circle */
                    iconColor: 'forestgreen'
                }
            }
        );
    }

    showError(message: string) {
        this._dialog.open(MessengerComponent,
            {
                data: {
                    message: message,
                    icon: 'error', /* error_outline */
                    iconColor: 'tomato'
                }
            }
        );
    }
}


