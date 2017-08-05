export class TaskActionRequest {
    action: string;
    assignee: string;

    constructor(action: string, assignee: string) {
        this.action = action;
        this.assignee = assignee;
    }
}