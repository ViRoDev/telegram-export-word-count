 import { CombinedProperties, Message, MessageTypes, TextInsertArray, TextInsertObject, TextType } from "messages.types";
import parseJSON from "parseJSON";
import emojiRegex from "emoji-regex";

const filterMessagesByTypeAndProperty = (type: MessageTypes, 
                          property: CombinedProperties, 
                          value: string,
                          messages: Message[]
                         ) => 
    messages.filter(m => 
        m.type === type && m[property] === value
    )

export const filterByProperty = (property: CombinedProperties, messages: Message[]) => 
        messages.map(m => m[property]);

export const getText = (messages: Message[], 
                        removeEmpty = true,
                        removeLinks = true,
                        removeMentions = true,
                        normalizeFontModifiers = true) => {
    let text = filterByProperty("text", messages) as Array<TextType>;
    const empty = removeEmpty ? text.filter(Boolean) : text;

    return empty;
}

export const textOnlyNonEmpyStringStrict = (messages: Message[]) => 
        getText(messages).map(msg => {
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
        filterMessagesByTypeAndProperty('message', 'from_id', userId, messages)

export default filterMessagesByTypeAndProperty;