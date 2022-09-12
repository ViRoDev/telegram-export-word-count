import fs from 'fs';
import {config} from 'dotenv'
import {filterFromUser, concatInnerArrays, splitIntoWords, getMessagesFromFile, textOnlyNonEmpyStringStrict } from "messages";
import { cache } from 'functionMemoization';

const CACHE_FOLDER_PATH = 'public/.cache'
const FILEPATH = 'public/result.json';
config({path: './public/.env'});

const main = async () => {
    console.log('reading messages from file')
    let gmff = getMessagesFromFile
    const messages = await cache<typeof gmff>(gmff, CACHE_FOLDER_PATH)(FILEPATH);
    console.log('\t...done. Message[0] = ', messages[0])

    console.log('filtering by user')
    let ffu = filterFromUser;
    const filtered = await cache<typeof ffu>(filterFromUser, CACHE_FOLDER_PATH)(messages, process.env.FROM_ID!!)
    console.log('\t...done, msg[0] = ', filtered[0])

    console.log('text only')
    let toness = textOnlyNonEmpyStringStrict;
    const textOnly = await cache<typeof toness>(toness, CACHE_FOLDER_PATH)(filtered);
    console.log('\t...done. Message[0] = ', textOnly[0])
    
    console.log('split into words')
    let siw = splitIntoWords;
    const messagesWordsArray = await cache<typeof siw>(splitIntoWords, CACHE_FOLDER_PATH)(textOnly);
    console.log('\t...done. Message[0] = ', messagesWordsArray[0])

    console.log('concat inner arrays')
    let cia = concatInnerArrays
    const totalWordsArray = await cache<typeof cia>(concatInnerArrays, CACHE_FOLDER_PATH)(messagesWordsArray)
    console.log('\t...done. Message[0] = ', totalWordsArray[0])

    console.log('Counting words')
    const wordsCount = new Map<string, number>();
    totalWordsArray.forEach(word => {
        if(wordsCount.has(word)) {
            const currNumber = wordsCount.get(word);
            wordsCount.set(word, currNumber!! + 1)
        }
        else {
            wordsCount.set(word, 1)
        }
    })
    console.log('\t...done. Message[0] = ', totalWordsArray[0])

    console.log("sorting array");
    const sortedWordsCount = new Map([...wordsCount.entries()].sort((a,b) => 
        a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0)
    ));
    //console.table(sortedWordsCount);
    console.log('\t...done')
    fs.writeFileSync("public/sorted.json", JSON.stringify(Object.fromEntries(sortedWordsCount)));
}

main();
