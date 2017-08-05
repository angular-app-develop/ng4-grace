import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStartLeaveComponent } from './workflow-start-leave.component';

describe('WorkflowStartLeaveComponent', () => {
  let component: WorkflowStartLeaveComponent;
  let fixture: ComponentFixture<WorkflowStartLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStartLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStartLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
