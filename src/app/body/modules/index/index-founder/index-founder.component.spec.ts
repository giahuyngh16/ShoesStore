import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFounderComponent } from './index-founder.component';

describe('IndexFounderComponent', () => {
  let component: IndexFounderComponent;
  let fixture: ComponentFixture<IndexFounderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFounderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFounderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
