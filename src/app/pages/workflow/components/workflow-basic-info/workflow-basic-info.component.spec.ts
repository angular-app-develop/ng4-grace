import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowBasicInfoComponent } from './workflow-basic-info.component';

describe('WorkflowBasicInfoComponent', () => {
  let component: WorkflowBasicInfoComponent;
  let fixture: ComponentFixture<WorkflowBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
