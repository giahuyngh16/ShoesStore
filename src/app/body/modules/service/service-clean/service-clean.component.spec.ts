import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCleanComponent } from './service-clean.component';

describe('ServiceCleanComponent', () => {
  let component: ServiceCleanComponent;
  let fixture: ComponentFixture<ServiceCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCleanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
