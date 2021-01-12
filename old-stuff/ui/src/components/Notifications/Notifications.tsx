import { Component } from 'react';
import {
    MessageIdToRefType,
    MessageInputType,
    MessageRecordType,
    MessageType,
    NotificationsPropsType,
} from './type';

export class Notifications extends Component<NotificationsPropsType, {}> {
    private messages: MessageRecordType[];
    private messageHeights: MessageIdToRefType;

    constructor(props: NotificationsPropsType) {
        super(props);

        this.messageHeights = {};
        this.messages = [];
    }

    componentDidMount(): void {
        const { emitter } = this.props;

        emitter.on('notification', this.notify);
    }

    componentWillUnmount(): void {
        const { emitter } = this.props;

        emitter.off('notification', this.notify);
    }

    notify = (messageInput: MessageInputType) => {
        let message: MessageType;

        if (typeof messageInput === 'string') {
            message = {
                text: messageInput,
                type: 'info',
            };
        } else {
            message = messageInput;
        }

        if (message.code) {
            this.closeMessagesByCode(message.code);
        }

        const id = Math.floor(Math.random() * 1000000);
        const messageRecord = {
            id,
            text: message.text,
            type: message.type || '',
            icon: message.icon || '',
            closeable: message.closeable !== false,
            closing: false,
            code: message.code,
            lifeTime: message.lifeTime || 0,
            props: message.props || {},
        };

        if (messageRecord.lifeTime > 0) {
            setTimeout(() => {
                this.closeMessage(id);
            }, message.lifeTime);
        }

        this.messages.push(messageRecord);

        this.forceUpdate();
    };

    closeMessage = (id: number) => {
        const message = this.messages.find((item) => item.id === id);

        if (message) {
            const heightNode = this.messageHeights[id];
            if (heightNode) {
                // lock the height of the element to let the animation know it
                heightNode.style.height = `${heightNode.offsetHeight}px`;
            }

            setTimeout(() => {
                this.removeMessage(id);
            }, 500);

            message.closing = true;

            this.forceUpdate();
        }
    };

    closeMessagesByCode(code: string) {
        this.messages
            .filter((message) => message.code === code)
            .forEach((message) => {
                this.closeMessage(message.id);
            });
    }

    removeMessage(id: number) {
        this.messages = this.messages.filter((message) => message.id !== id);
        delete this.messageHeights[id];
        this.forceUpdate();
    }

    render() {
        const { children } = this.props;

        return children({
            messages: this.messages.map((message) => ({
                ...message,
                ref: (ref) => {
                    this.messageHeights[message.id] = ref!;
                },
            })),
            onCloseMessage: this.closeMessage,
        });
    }
}
