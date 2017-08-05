import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowOperationComponent } from './workflow-operation.component';

describe('WorkflowOperationComponent', () => {
  let component: WorkflowOperationComponent;
  let fixture: ComponentFixture<WorkflowOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
