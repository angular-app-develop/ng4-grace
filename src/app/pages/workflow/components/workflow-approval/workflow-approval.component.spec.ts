import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowApprovalComponent } from './workflow-approval.component';

describe('WorkflowApprovalComponent', () => {
  let component: WorkflowApprovalComponent;
  let fixture: ComponentFixture<WorkflowApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
