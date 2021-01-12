import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

export type Nullable<X = any> = X | null;

export interface StringMap<P = any> {
    [key: string]: P;
}

export interface IntegerMap<P = any> {
    [key: number]: P;
}

export interface GenericClass {
    new (...args: any[]): {};
}

interface ContextParameters {
    req: Request;
    res: Response;
}

export type ContextBuilder = (parameters: ContextParameters) => StringMap;

export type PropertyDescriptor = TypedPropertyDescriptor<
    (params: any) => Promise<any>
> & { initializer?: Function } & { value?: Function };

export interface InputContext<CTX = StringMap> {
    req: Request;
    res: Response;
    body?: any;
    headers: IncomingHttpHeaders;
    context: CTX;
}

export interface DTOType extends GenericClass {}

export type DTOAttributeType = DTOType | 'string' | 'number' | 'boolean';

export interface MethodRecordCallbackContext {
    req: Request;
    res: Response;
    body: any;
    headers: IncomingHttpHeaders;
    context: StringMap;
}

export interface MethodRecord extends StringMap {
    method: string;
    endpoint: string;
    fn: (params: StringMap, context: MethodRecordCallbackContext) => void;
    bodyDTO: DTOType;
    outputDTO: DTOType;
}

export interface VaultRecord extends StringMap {}

export interface APIVaultRecord extends VaultRecord {
    endpoint: string;
    methods: StringMap<MethodRecord>;
}

export interface DTORecordParameter {
    required: boolean;
    type: DTOAttributeType | DTOAttributeType[];
}

export interface DTORecord {
    params: DTORecordParameter;
}

export interface DTOVaultRecord extends VaultRecord {
    isDTO: boolean;
    attributes: StringMap<DTORecord>;
}

export interface ResultError {
    message?: string;
    code: string;
    type?: string;
}
