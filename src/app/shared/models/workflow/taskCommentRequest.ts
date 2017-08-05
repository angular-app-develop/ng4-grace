export class TaskCommentRequest {
    message: string;
    saveProcessInstanceId: boolean;

    constructor(message: string, saveProcessInstanceId: boolean) {
        this.message = message;
        this.saveProcessInstanceId = saveProcessInstanceId;
    }
}