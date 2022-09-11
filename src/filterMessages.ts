import { CombinedProperties, Message, Messages, MessageTypes, TextInsertArray, TextInsertObject, TextType } from "messages.types";
import parseJSON from "parseJSON";
import emojiRegex from "emoji-regex";

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
    propertyOnly("text", messages) as Array<TextType>;

export const textOnlyNonEmpty = (messages: Messages) => 
        textOnly(messages).filter(Boolean);

export const textOnlyNonEmpyStringStrict = (messages: Messages) => 
        textOnlyNonEmpty(messages).map(msg => {
            if(typeof msg === 'string') return msg;
            return transformTextSpecialCaseIntoString(msg);
        })

export const transformTextSpecialCaseIntoString = (text: TextInsertArray) => {
    const mapped = text.map(el => {
        if(typeof el === 'string' ) return el
        return el.text
    })

    return ''.concat(...mapped)
}

export const splitIntoWords = (messages: string[]) => {
    const emojiReg = emojiRegex();
    const spacesPunctuationReg = /[\s,.;:?\-\"\'\(\)\[\]]+/;
    return messages.map(msg => msg
        .replace(emojiReg, '')
        .toLowerCase()
        .split(spacesPunctuationReg));
}

export const concatInnerArrays = (messages: string[][]) => messages
        .reduce((prev, cur) =>
            prev.concat([...cur]))
        .filter(Boolean);

export const getMessagesFromFile = async (filepath: string) => 
        (await parseJSON(filepath)).messages

export const filterFromUser = (messages : Array<Message>, userId : string) => 
        filteredMessages('message', 'from_id', userId, messages)

export default filteredMessages;