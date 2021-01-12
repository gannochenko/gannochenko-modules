import React, { useCallback, useContext } from 'react';
import { EventEmitter } from 'events';
import { MessageInputType } from './type';
import { Nullable } from '../../type';

export const NotificationContext = React.createContext<Nullable<EventEmitter>>(
    null,
);

export const NotificationProvider = NotificationContext.Provider;

export const useNotificationEventEmitter = () =>
    useContext<Nullable<EventEmitter>>(NotificationContext);

export const useNotification = () => {
    const emitter = useNotificationEventEmitter()!;
    return useCallback(
        (messageInput: MessageInputType) =>
            emitter && emitter.emit('notification', messageInput),
        [emitter],
    );
};
