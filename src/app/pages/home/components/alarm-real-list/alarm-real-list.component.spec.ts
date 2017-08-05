import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmRealListComponent } from './alarm-real-list.component';

describe('AlarmRealListComponent', () => {
  let component: AlarmRealListComponent;
  let fixture: ComponentFixture<AlarmRealListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmRealListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmRealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
