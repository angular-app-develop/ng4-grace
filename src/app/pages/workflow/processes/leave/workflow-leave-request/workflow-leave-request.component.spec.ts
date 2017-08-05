import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLeaveComponent } from './workflow-leave.component';

describe('WorkflowLeaveComponent', () => {
  let component: WorkflowLeaveComponent;
  let fixture: ComponentFixture<WorkflowLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
