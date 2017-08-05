import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workflow-start-leave',
  templateUrl: './workflow-start-leave.component.html',
  styleUrls: ['./workflow-start-leave.component.scss']
})
export class WorkflowStartLeaveComponent implements OnInit {

  wf_operationActive: boolean = true;
  wf_infoActive: boolean = true;
  wf_formActive: boolean = true;
  wf_managementApprovedActive: boolean = false;
  wf_hrApprovedActive: boolean = false;
  wf_recordActive: boolean = false;

  constructor() { }

  ngOnInit() {}

  beforePanelChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'wf_operation') {
      this.wf_operationActive = $event.nextState;
    }
    if ($event.panelId === 'wf_info') {
      this.wf_infoActive = $event.nextState;
    }
    if ($event.panelId === 'wf_form') {
      this.wf_formActive = $event.nextState;
    }
    if ($event.panelId === 'wf_managementApproved') {
      this.wf_managementApprovedActive = $event.nextState;
    }
    if ($event.panelId === 'wf_hrApproved') {
      this.wf_hrApprovedActive = $event.nextState;
    }
    if ($event.panelId === 'wf_record') {
      this.wf_recordActive = $event.nextState;
    }
  }

}