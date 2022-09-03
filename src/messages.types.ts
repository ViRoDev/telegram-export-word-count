export type MessageTypes = "service" | "message" 
export type ActionTypes = "edit_group_photo" | "migrate_from_group" | "invite_members"

export type Message = {
    id: number,
    type: MessageTypes,
    date: string,
    date_unixtime: number,
    text: string,
}

export type ServiceMessage = Message & {
    actor: string,
    actor_id: number,
    action: ActionTypes,
}

export type UserMessage = Message & {
    from: string,
    from_id: number,
    reply_to_message_id?: number,
}