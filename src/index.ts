import fs from 'fs';
import {config} from 'dotenv'
import filteredMessages, { concatInnerArrays, splitIntoWords, textOnlyNonEmpty, textOnlyNonEmpyStringStrict } from "filterMessages";
import parseJSON from "./parseJSON";
import { Message } from 'messages.types';
import { cache } from 'functionMemoization';

const CACHE_FOLDER_PATH = 'public/.cache'
const FILEPATH = 'public/result.json';
config({path: './public/.env'});

const main = async () => {
    console.log('reading messages from file')
    let gmff = getMessagesFromFile
    const messages = await cache<typeof gmff>(gmff, CACHE_FOLDER_PATH)(FILEPATH);
    console.log('\t...done')

    console.log('filtering by user')
    let ffu = filterFromUser;
    const filtered = await cache<typeof ffu>(filterFromUser, CACHE_FOLDER_PATH)(messages)
    console.log('\t...done')

    console.log('text only')
    let toness = textOnlyNonEmpyStringStrict;
    const textOnly = await cache<typeof toness>(toness, CACHE_FOLDER_PATH)(filtered);
    console.log('\t...done')
    
    console.log('split into words')
    let siw = splitIntoWords;
    const messagesWordsArray = await cache<typeof siw>(splitIntoWords, CACHE_FOLDER_PATH)(textOnly);
    console.log('\t...done')

    console.log('concat inner arrays')
    let cia = concatInnerArrays
    const totalWordsArray = await cache<typeof cia>(concatInnerArrays, CACHE_FOLDER_PATH)(messagesWordsArray)
    console.log('\t...done')

    fs.writeFileSync("public/words.json", JSON.stringify(totalWordsArray));
}

const getMessagesFromFile = async (filepath: string) => 
    (await parseJSON(filepath)).messages

const filterFromUser = (messages : Array<Message>) => 
    filteredMessages('message', 'from_id', process.env.FROM_ID!!, messages)

main();
