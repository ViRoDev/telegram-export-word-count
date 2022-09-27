import fs from 'fs';
import {config} from 'dotenv'
import * as ch from 'cached'

const CACHE_FOLDER_PATH = 'public/.cache'
const FILEPATH = 'public/result.json';
config({path: './public/.env'});

const main = async () => {
    ch.changeCachePath(CACHE_FOLDER_PATH);
    
    const messages = await ch.messagesFromFile(FILEPATH)
    const filtered = await ch.filterFromUser(messages, process.env.FROM_ID!!);
    const textOnly = await ch.textOnly(filtered);
    const messagesWordsArray = await ch.splitMessagesToWords(textOnly)
    const totalWordsArray = await ch.joinWordArrays(messagesWordsArray)

    const wordsCount = new Map<string, number>();
    totalWordsArray.forEach(word => {
        if(wordsCount.has(word)) {
            const currNumber = wordsCount.get(word);
            wordsCount.set(word, currNumber!! + 1)
        }
        else wordsCount.set(word, 1)
    })
    
    const sortedWordsCount = new Map([...wordsCount.entries()].sort((a,b) => 
        a[1] > b[1] ? -1 : (a[1] < b[1] ? 1 : 0)
    ));

    fs.writeFileSync("public/sorted.json", JSON.stringify(Object.fromEntries(sortedWordsCount)));
}

main();
