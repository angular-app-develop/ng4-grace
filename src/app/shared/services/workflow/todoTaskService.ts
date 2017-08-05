
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { AuthenticationService } from '../../../layout/services/authentication.service';
import { WorkflowService } from './workflow.service';
import { TaskObject, ProcessDefinitionObject, Variable } from '@models/workflow/index';


@Injectable()
export class TodoTaskService {
    private applyer: string;
    private taskObject: TaskObject;
    private taskObjectArray: Array<TaskObject>;
    private processDefinitionArray: Array<ProcessDefinitionObject>;
    private isGetProcessDefinition: Boolean = false;
    private currentProcessDefinition: ProcessDefinitionObject;

    constructor(
        private service: WorkflowService,
        private authenticationService: AuthenticationService,
        private toastrService: ToastrService,
        private toastrConfig: ToastrConfig
    ) {
        this.taskObjectArray = new Array<TaskObject>();
        this.processDefinitionArray = new Array<ProcessDefinitionObject>();
    }

    getHistoryTaskById(taskId): Observable<any> {
        if (!taskId)
            return null;
        this.taskObject = new TaskObject();
        let processInstanceId;
        return this.service.getHistoricTaskInstancesByTaskId(taskId)
            .map((data) => {
                this.setTaskInfo(data);
                processInstanceId = Number.parseInt(this.taskObject.processInstanceId);
            })
            .mergeMap(res => {
                return this.service.getHistoricVariableInstances(processInstanceId).map(res => {
                    return this.setProcessVariables(res);
                });
            });
    }

    getHistoryProcessById(processInstanceId): Observable<any> {
        if (!processInstanceId)
            return null;
        this.taskObject = new TaskObject();
        return this.service.getHistoricTaskInstances(processInstanceId)
            .map(data => {
                if (!data.data || data.data.length == 0)
                    return;
                this.setTaskInfo(data.data[data.data.length - 1]);
            })
            .mergeMap(res => {
                return this.service.getHistoryProcessById(processInstanceId)
                    .map(data => {
                        if (!data.data)
                            return null;
                        this.setHistoryEvent(data.data);
                        return this.taskObject;
                    })
            });
    }

    private setHistoryEvent(data) {
        if (data.length == 0)
            return;
        this.taskObject.variables = Array<Variable>();
        let temp = data[data.length - 1];
        this.taskObject.variables.push(new Variable("processEndTime", temp.endTime));
        this.taskObject.variables.push(new Variable("processStartTime", temp.startTime));
        this.taskObject.variables.push(new Variable("startActivityId", temp.startActivityId));
        this.taskObject.variables.push(new Variable("endActivityId", temp.endActivityId));
        for (var element of temp.variables) {
            this.taskObject.variables.push(new Variable(element.name, element.value));
        }
    }

    private setProcessVariables(data) {
        if (!data || data.data.length == 0)
            return null;
        this.taskObject.variables = Array<Variable>();
        for (var element of data.data) {
            if (!element.variable)
                continue;
            this.taskObject.variables.push(new Variable(element.variable.name, element.variable.value));
        }
        return this.taskObject;
    }

    getTaskById(taskId): Observable<any> {
        if (!taskId)
            return null;

        this.taskObject = new TaskObject();
        return this.service.getTaskById(taskId)
            .map((data) => {
                this.setTaskInfo(data);
            })
            .mergeMap(res => {
                return this.service.getTaskVariable(taskId).map(res => {
                    this.taskObject.setTaskVariables(res);
                    return this.taskObject;
                });
            });
    }

    getTaskList(): Observable<any> {
        this.initArray();
        this.applyer = this.authenticationService.getUserName();
        return this.service.getProcesses()
            .map((data) => {
                this.setProcessDefinitions(data.data);
            })
            .mergeMap(res => {
                return this.service.getTasks(this.applyer).map(res => {
                    this.setTaskListInfo(res.data);
                    return this.taskObjectArray.sort(this.sortedArray);
                });
            });
    }

    sortedArray(a, b) {
        var dateA = new Date(a.createTime).getTime();
        var dateB = new Date(b.createTime).getTime();
        return dateA < dateB ? 1 : -1;
    }

    initArray() {
        for (var element of this.taskObjectArray) {
            element.variables.length = 0;
        }
        this.taskObjectArray.length = 0;
        this.processDefinitionArray.length = 0;
    }

    setProcessDefinitions(data) {
        if (this.processDefinitionArray.length > 0)
            return;
        for (var i = 0; i < data.length; i++) {
            let item = new ProcessDefinitionObject();
            item.id = data[i]['id'];
            item.key = data[i]['key'];
            item.name = data[i]['name'];
            item.description = data[i]['description'];
            item.tenantId = data[i]['tenantId'];
            item.deploymentId = data[i]['deploymentId'];
            this.processDefinitionArray.push(item);
        }
    }

    setTaskProcessDefinition(taskobj) {
        if (!this.isGetProcessDefinition) {
            this.currentProcessDefinition = this.processDefinitionArray.find(obj => obj.id == taskobj.processDefinitionId);
            this.isGetProcessDefinition = true;
        }
        if (!this.currentProcessDefinition)
            return;

        var { id, key, name } = this.currentProcessDefinition;
        taskobj.processDefinitionId = id;
        taskobj.processDefinitionKey = key;
        taskobj.processDefinitionName = name;
    }

    setTaskListInfo(data) {
        for (var i = 0; i < data.length; i++) {
            let item = new TaskObject();
            var { id, name, assignee, owner, createTime, dueDate, processInstanceId, executionId,
                taskDefinitionKey, parentTaskId, processDefinitionId } = data[i];

            item.id = id;
            item.name = name;
            item.assignee = assignee;
            item.owner = owner;
            item.processInstanceId = processInstanceId;
            item.executionId = executionId;
            item.taskDefinitionKey = taskDefinitionKey;
            item.processDefinitionId = processDefinitionId;
            item.parentTaskId = parentTaskId;
            item.setResidenceTime(createTime, dueDate);
            item.setTaskVariables(data[i]['variables']);
            item.setApplyer();
            this.setTaskProcessDefinition(item);
            this.taskObjectArray.push(item);
        }
    }

    setTaskInfo(data) {
        if (!data)
            return;
        var { id, name, assignee, owner, createTime, startTime,dueDate, processInstanceId, executionId,
            taskDefinitionKey, parentTaskId, processDefinitionId } = data;
        this.taskObject.id = id;
        this.taskObject.name = name;
        this.taskObject.assignee = assignee;
        this.taskObject.owner = owner;
        this.taskObject.processInstanceId = processInstanceId;
        this.taskObject.executionId = executionId;
        this.taskObject.taskDefinitionKey = taskDefinitionKey;
        this.taskObject.processDefinitionId = processDefinitionId;
        this.taskObject.parentTaskId = parentTaskId;
        if (createTime) {
            this.taskObject.setResidenceTime(createTime,dueDate);
        }
        if(startTime){
            this.taskObject.setResidenceTime(startTime,dueDate);
        }
    }

    showToast(type, msg, title) {
        if (type === 'info') {
            this.toastrConfig = { timeOut: 1000 };
            this.toastrService.info(msg, title, this.toastrConfig);
        }
        if (type === 'success') {
            this.toastrService.success(msg, title);
        }
        if (type === 'warning') {
            this.toastrConfig = {
                timeOut: 1000,
                positionClass: 'toast-bottom-right'
            };
            this.toastrService.warning(msg, title, this.toastrConfig);
        }
        if (type === 'error') {
            this.toastrService.error(msg, title);
        }
    }
}
