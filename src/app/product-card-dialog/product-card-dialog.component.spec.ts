import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardDialogComponent } from './product-card-dialog.component';

describe('ProductCardDialogComponent', () => {
  let component: ProductCardDialogComponent;
  let fixture: ComponentFixture<ProductCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
