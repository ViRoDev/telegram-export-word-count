import fs from 'fs';
import {config} from 'dotenv'
import filteredMessages from "filterMessages";
import parseJSON from "./parseJSON";
import { Message } from 'messages.types';

const FILEPATH = 'public/result.json';
config({path: './public/.env'});

const main = async () => {
    const messages = await getMessagesFromFile(FILEPATH)
    const filtered = filterFromUser(messages)
    const textOnly = filtered.map(msg => msg.text)
    //or open already existing file 
    fs.writeFileSync("public/filtered.json", JSON.stringify(textOnly));
}

const getMessagesFromFile = async (filepath: string) => 
    (await parseJSON(filepath)).messages

const filterFromUser = (messages : Array<Message>) => 
    filteredMessages('message', 'from_id', process.env.FROM_ID ?? "user01", messages)

main();
