import { Variable } from './variable';
export class TaskCompleteRequest {
    action: string;
    variables: Variable[];
}