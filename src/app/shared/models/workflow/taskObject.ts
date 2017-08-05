import * as moment from 'moment';
import { Variable } from './variable';

export class TaskObject {
    id: string;
    name: string;
    owner?: any;
    assignee?: string;
    delegationState?: any;
    applyer: string;
    createTime: string;
    dueDate?: string;
    duringTime: string;
    description?: string;
    taskDefinitionKey?: string;
    parentTaskId: string;
    executionId: string;
    processInstanceId: string;
    processDefinitionId: string;
    processDefinitionKey: string;
    processDefinitionName: string;
    variables: Variable[];

    resetCellColor: boolean = false;

    constructor() {
    }

    public setTaskVariables(data) {
        if (!data) return;
        this.variables = Array<Variable>();
        for (var element of data) {
            this.variables.push(new Variable(element.name, element.value));
        }
    }
    public setApplyer() {
        let obj = this.variables.find(oc => oc.name == "applyUserId");
        if (obj) {
            this.applyer = obj.value;
        }
    }

    public setResidenceTime(createTime: string, duedate: string) {
        if (!createTime)
            return;
        this.createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss')
    }
}
