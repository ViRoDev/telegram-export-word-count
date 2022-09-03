export type MessageTypes = "service" | "message" 
export type ActionTypes = "edit_group_photo" | "migrate_from_group" | "invite_members"

export type TextSpecialInsertType = "phone" | 'link' | 'mention' | 'text_link' | 'bold' | 'email' |'bot_command' 
export type TextInsertObject = {type: TextSpecialInsertType, text: string}
export type TextSpecialArrayType = string | TextInsertObject;
export type TextInsertArray = [...Array<TextSpecialArrayType>]
export type TextType = string | TextInsertArray;

export type Messages = Array<Message>;
export type MessageProperties = "id" | "type" | "date" | "date_unixtime" | "text";
export type Message = {
    id: number,
    type: MessageTypes,
    date: string,
    date_unixtime: number,
    text: TextType,
    actor?: string,
    actor_id?: number,
    action?: ActionTypes,
    from?: string,
    from_id?: number,
    reply_to_message_id?: number,
}

export type ServiceMessageProperties = MessageProperties | "actor" | "actor_id" | "action";
export type ServiceMessage = Message & {
    actor: string,
    actor_id: number,
    action: ActionTypes,
}

export type UserMessageProperties = MessageProperties | "from" | "from_id" | "reply_to_message_id";
export type UserMessage = Message & {
    from: string,
    from_id: number,
    reply_to_message_id?: number,
}

export type CombinedProperties = UserMessageProperties | ServiceMessageProperties
export type CombinedMessage = UserMessage & ServiceMessage;
