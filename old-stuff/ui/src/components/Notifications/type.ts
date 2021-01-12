import { ReactNode } from 'react';
import { EventEmitter } from 'events';
import { ObjectLiteral } from '../../type';

export type NotificationsPropsType = {
    children: ChildrenType;
    emitter: EventEmitter;
};

type ChildrenType = (params: {
    messages: MessageRecordWithRefType[];
    onCloseMessage: (id: number) => void;
}) => ReactNode;

export type MessageType = {
    text: string;
    type?: string;
    code?: string;
    icon?: string;
    closeable?: boolean;
    lifeTime?: number;
    props?: ObjectLiteral;
};

export type MessageInputType = MessageType | string;

export type MessageRecordType = {
    id: number;
    closeable: boolean;
    closing: boolean;
} & MessageType;

export type MessageRecordWithRefType = MessageRecordType & {
    ref: (ref: HTMLDivElement) => void;
};

export type MessageIdToRefType = {
    [key: number]: HTMLDivElement;
};

export type NotifyFunctionType = (message: MessageInputType) => void;

export type NotificationContextPropsType = {
    notificationsEventEmitter: EventEmitter;
    notify: NotifyFunctionType;
};
