import { CombinedProperties, Messages, MessageTypes } from "messages.types";

const filteredMessages = (type: MessageTypes, 
                          property: CombinedProperties, 
                          value: string,
                          messages: Messages
                         ) => 
    messages.filter(m => 
        m.type === type && m[property] === value
    )

export const propertyOnly = (property: CombinedProperties, messages: Messages) => 
        messages.map(m => m[property]);

export const textOnly = (messages: Messages) => 
    propertyOnly("text", messages);

export const textOnlyNonEmpty = (messages: Messages) => 
        textOnly(messages).filter(Boolean);

export default filteredMessages;