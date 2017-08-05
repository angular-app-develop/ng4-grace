import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmLevelStatComponent } from './alarm-level-stat.component';

describe('AlarmLevelStatComponent', () => {
  let component: AlarmLevelStatComponent;
  let fixture: ComponentFixture<AlarmLevelStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmLevelStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmLevelStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
