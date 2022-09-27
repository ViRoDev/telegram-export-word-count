import fs from 'fs';
import {config} from 'dotenv'
import parseJSON from 'parseJSON';
import emojiRegex from "emoji-regex";
import { TextPropType } from 'messages.types';

const CACHE_FOLDER_PATH = 'public/.cache'
const FILEPATH = 'public/result.json';
config({path: './public/.env'});

const main = async () => {    
    const exportedInfo = await parseJSON(FILEPATH)
    const messages = exportedInfo.messages;
    const result = messages
        // non-service messages
        .filter((msg) => msg.type == 'message')
        // from specified user
        .filter((msg) => msg.from_id == process.env.FROM_ID!!)
        // with non-empty text field
        .filter((msg) => msg.text)
        // get those text fields
        .map(msg => msg.text)
        // filter-out links & mentions
        .map(filterLinks)
        .map(filterMentions)
        // normalize all text properties to strings
        .map(textPropToString)
        .map(str => str.replace(emojiRegex(), ''))
        .map(str => str.toLowerCase())
        // split strints into arrays of words (and filter-out empty ones)
        .map(str => str.split(/[\s,.;:?\-\"\'\(\)\[\]]+/).filter(Boolean))
        // join all words into single array 
        .reduce((totalWordArray, messageWordArray) => 
            totalWordArray.concat(messageWordArray))
        
    fs.writeFileSync("public/words.json", JSON.stringify(result));
}

main();

const filterLinks = (text : TextPropType) => {
    if (typeof text === 'string') return text;
    return text.filter(text => {
        if (typeof text === 'string') return true;
        if (text.type === 'link') return false;
        return true;
    })
}

const filterMentions = (text : TextPropType) => {
    if (typeof text === 'string') return text;
    return text.filter(text => {
        if (typeof text === 'string') return true;
        if (text.type === 'mention') return false;
        return true;
    })
}

const textPropToString = (text : TextPropType) : string => {
    if (typeof text === 'string') return text;
    return text.map(text => {
        if (typeof text === 'string') return text;
        return text.text
    })
    .join()
}