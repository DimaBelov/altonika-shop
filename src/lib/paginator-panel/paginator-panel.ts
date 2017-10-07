import { Component, ViewChild, ElementRef, Input, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Paginator } from '@services/paginator';
import { Logger } from '@services/logger';
import * as $ from 'jquery';

interface OnAll extends OnInit, OnChanges, AfterViewInit {

}

@Component({
    selector: 'paginator-panel',
    templateUrl: './paginator-panel.html',
    styleUrls: ['./paginator-panel.css'],
    encapsulation: ViewEncapsulation.None

})
export class PaginatorPanel implements OnAll {

    @Input() paginator: Paginator<any>;
    @ViewChild('pageNumbersContainerTest') pageNumbersContainerTest: ElementRef;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

    }

    ngAfterViewInit() {
        if (this.pageNumbersContainerTest == null) {
            return;
        }
        
        let html = '';
        let currentPage = this.paginator.paggingOptions.pageNumber;
        let resultPageNumbers = this.paginator.paggingResult.pageNumbers;
        let minStep = 2;
        let maxStep = 4;
        let bottom = currentPage;
        let top = currentPage + minStep;
        let diff = resultPageNumbers.length - currentPage;
        let magic = resultPageNumbers.length >= maxStep ?
            maxStep : resultPageNumbers.length;

        if (diff <= magic) {
            bottom = currentPage - (magic - diff);
            top = currentPage + diff;
        }

        let i: number;
        for (i = bottom; i <= top; i++) {
            if (i === 0 || i >= resultPageNumbers.length) {
                continue;
            }
            html += this.getButton(i);
        }

        let last = resultPageNumbers[resultPageNumbers.length - 1];

        if (i < last) {
            html += '<p class="page-numbers-separator">...</p>';
        }

        html += this.getButton(last);

        this.pageNumbersContainerTest.nativeElement.innerHTML = html;

        let btns = this.pageNumbersContainerTest.nativeElement.getElementsByTagName('button');
        for (let j = 0; j < btns.length; j++) {
            let btn = $(btns[j]);
            btn.click(() => this.paginator.selectPage(+btn.attr('data-value')));
        }
    }

    getButton(n: number) {

        return '<button data-value="' + n + '" class="btn btn-default page-numbers-panel-btn ' + 
        (n === this.paginator.paggingOptions.pageNumber ? 'selected">' : '">') +
        // + '">' + 
            n + 
        '</button>';
    }
}
