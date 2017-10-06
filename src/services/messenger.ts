import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-messenger',
    template: 
        '<div [ngStyle]="data.style" style=" width: 300px;">' + 
            '<div style="height: 24px;">' + 
                '<md-icon [ngStyle]="{color: data.iconColor, float: \'left\'}">{{data.icon}}</md-icon>' +
                '<span style="height: 24px; line-height: 24px; margin-left: 5px;">' + 
                    '{{data.title}}' + 
                '</span>' +
            '</div>' +
            '<div>' + 
                '<span>' + 
                    '{{data.message}}' + 
                '</span>' +
            '</div>' +
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
                    title: 'Инфо',
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

    showError(message: string, title?: string) {
        this._dialog.open(MessengerComponent,
            {
                data: {
                    title: title != null ? title : 'Ошибка',
                    message: message,
                    icon: 'error', /* error_outline */
                    iconColor: 'tomato'
                }
            }
        );
    }

    onError(error: any, title?: string) {
        let errorText = '';
        if (error.error != null && error.error.exception != null) {
          console.log(error.error != null);
          console.log(error.error.exception != null);
          errorText = error.error.exception.message;
        } else {
          errorText = error.name + ': ' + error.message;
        }

        this.showError(errorText, title);
    }
}


