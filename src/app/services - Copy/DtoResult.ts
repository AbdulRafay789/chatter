
import {ErrorObject} from './ErrorObject';
export interface DtoResult<T extends any> {
    data: T;
    errors: ErrorObject[] | string;
    isSuccessful: boolean;
    keyValue: any;
}
