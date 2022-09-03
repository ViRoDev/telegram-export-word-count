export type MessageTypes = "service" | "message" 
export type ActionTypes = "edit_group_photo" | "migrate_from_group" | "invite_members"

export type MessageProperties = "id" | "type" | "date" | "date_unixtime" | "text";
export type Message = {
    id: number,
    type: MessageTypes,
    date: string,
    date_unixtime: number,
    text: string,
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
