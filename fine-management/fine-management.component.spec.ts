import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineManagementComponent } from './fine-management.component';

describe('FineManagementComponent', () => {
  let component: FineManagementComponent;
  let fixture: ComponentFixture<FineManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FineManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
