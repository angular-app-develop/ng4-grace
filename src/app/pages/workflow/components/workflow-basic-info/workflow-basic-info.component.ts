import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workflow-basic-info',
  templateUrl: './workflow-basic-info.component.html',
  styleUrls: ['./workflow-basic-info.component.scss']
})
export class WorkflowBasicInfoComponent implements OnInit {
  @Input() taskId: string;
  @Input() taskName: string;
  @Input() applyUserId: string;
  @Input() createTime: string;
  @Input() assignee:string;

  constructor() {
  }

  ngOnInit() {
  }
}
