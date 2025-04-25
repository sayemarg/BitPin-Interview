import messages from '../data/messages.json';

type MessageKey = keyof typeof messages;

export const getMessage = (key: MessageKey) => messages[key];
