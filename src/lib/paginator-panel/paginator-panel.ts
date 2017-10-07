import { Component, ElementRef, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Paginator } from '@services/paginator';
import { Logger } from '@services/logger';

@Component({ 
    selector: 'paginator-panel',
    templateUrl: './paginator-panel.html',
    styleUrls: ['./paginator-panel.css'],
    encapsulation: ViewEncapsulation.None

})
export class PaginatorPanel implements OnInit {

    @Input() paginator: Paginator<any>;

    constructor() {

    }

    ngOnInit () {
        Logger.log('PaginatorPanel', 'paginator', this.paginator);
    }
}
