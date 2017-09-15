import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-success-dialog',
  templateUrl: './order-success-dialog.component.html',
  styleUrls: ['./order-success-dialog.component.css']
})
export class OrderSuccessDialogComponent implements OnInit {

  orderId: number;

  constructor(public dialogRef: MdDialogRef<OrderSuccessDialogComponent>) { }

  ngOnInit() {
  }

}
