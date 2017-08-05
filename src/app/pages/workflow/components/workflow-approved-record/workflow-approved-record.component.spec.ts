import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowApprovedRecordComponent } from './workflow-approved-record.component';

describe('WorkflowApprovalComponent', () => {
  let component: WorkflowApprovedRecordComponent;
  let fixture: ComponentFixture<WorkflowApprovedRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowApprovedRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowApprovedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
