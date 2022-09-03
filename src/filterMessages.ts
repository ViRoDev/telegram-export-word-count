import { CombinedMessage, CombinedProperties, Message, MessageTypes } from "messages.types";

const filteredMessages = (type: MessageTypes, 
                          property: CombinedProperties, 
                          value: string,
                          messages: Array<Message>
                         ) => 
    messages.filter(m => 
        m.type === type && m[property] === value
    )


export default filteredMessages;