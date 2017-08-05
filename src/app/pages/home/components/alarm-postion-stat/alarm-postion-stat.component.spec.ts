import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPostionStatComponent } from './alarm-postion-stat.component';

describe('AlarmPostionStatComponent', () => {
  let component: AlarmPostionStatComponent;
  let fixture: ComponentFixture<AlarmPostionStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmPostionStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPostionStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
