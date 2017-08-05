import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WokrflowGroupsUsersMain } from './workflow-groups-users.main';

describe('WokrflowGroupsUsersMain', () => {
  let component: WokrflowGroupsUsersMain;
  let fixture: ComponentFixture<WokrflowGroupsUsersMain>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WokrflowGroupsUsersMain ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WokrflowGroupsUsersMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
