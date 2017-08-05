/**
 * Created by DELL on 2017/7/21.
 */
export class ApprovedRecord {
  id: string;
  taskId: string;
  claimName: string;
  claimTime: string;
  taskDefinitionKey: string;
  curPoint: string;
  result: string;
  remark: string;

  constructor() {};
}

export class HistoricTaskObject {
  id: string;
  assignee: string;
  endTime: string;
  taskDefinitionKey: string;
  name: string;

  constructor() {};
}

export class HistoricVariableObject {
  id: string;
  name: string;
  value: string;

  constructor() {};
}

export class HistoricCommentObject {
  id: string;
  taskId: string;
  message: string;

  constructor() {};
}
