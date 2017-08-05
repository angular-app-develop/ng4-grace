import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowTaskDetailOperation } from '@models/workflow/index';

@Component({
  selector: 'app-workflow-desktop',
  templateUrl: './workflow-desktop.component.html',
  styleUrls: ['./workflow-desktop.component.scss']
})
export class WorkflowDesktopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fillInLeaveRequest() {
    this.router.navigate(['/pages/workflow/workflowleavedocument'],
      { queryParams: { type: WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.startevent1] } });

  }

  queryLeaveHistory() {
    this.router.navigate(['/pages/workflow/workflowsearch']);
    // this.router.navigate(['/pages/workflow/workflowtaskdetail'],
    //   {
    //     queryParams: {
    //       id: 60,
    //       type: WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.historyDetail]
    //     }
    //   });
  }

}
