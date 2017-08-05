import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDesktopComponent } from './workflow-desktop.component';

describe('WorkflowDesktopComponent', () => {
  let component: WorkflowDesktopComponent;
  let fixture: ComponentFixture<WorkflowDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
