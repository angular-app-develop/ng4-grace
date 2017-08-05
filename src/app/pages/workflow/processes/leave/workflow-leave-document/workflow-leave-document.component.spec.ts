import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTaskDetailComponent } from './workflow-task-detail.component';

describe('WorkflowTaskDetailComponent', () => {
  let component: WorkflowTaskDetailComponent;
  let fixture: ComponentFixture<WorkflowTaskDetailComponent>;
  let mockService = {
    getData: () => void 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowTaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
