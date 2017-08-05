import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTasksComponent } from './workflow-tasks.component';

describe('WorkflowTasksComponent', () => {
  let component: WorkflowTasksComponent;
  let fixture: ComponentFixture<WorkflowTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
