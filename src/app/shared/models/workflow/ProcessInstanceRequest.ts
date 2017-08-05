import { Variable } from './variable';
export class ProcessInstanceRequest {
    processDefinitionKey: string;
    // businessKey: any;
    returnVariables: boolean;
    variables: Variable[];
}
