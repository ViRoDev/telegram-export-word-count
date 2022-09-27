import { cache } from "functionMemoization";
import { concatInnerArrays, getMessagesFromFile, splitIntoWords, textOnlyNonEmpyStringStrict } from "messages";
import { Message } from "messages.types";

let CACHE_FOLDER_PATH = '.cache'
export const changeCachePath = (path : string) => CACHE_FOLDER_PATH = path;

export const messagesFromFile = async (filepath : string) => {
    let gmff = getMessagesFromFile
    return await cache<typeof gmff>(gmff, CACHE_FOLDER_PATH)(filepath);
}

export const filterFromUser = (messagesToFilter: Message[], userID: string) : Message[] => {
    let ffu = filterFromUser;
    return cache<typeof ffu>(filterFromUser, CACHE_FOLDER_PATH)(messagesToFilter, process.env.FROM_ID!!);
}

export const textOnly = (messagesToFilter : Message []) => {
    let toness = textOnlyNonEmpyStringStrict;
    return cache<typeof toness>(toness, CACHE_FOLDER_PATH)(messagesToFilter);
}

export const splitMessagesToWords = (textArrayToReduce : string[]) => {
    let siw = splitIntoWords;
    return cache<typeof siw>(splitIntoWords, CACHE_FOLDER_PATH)(textArrayToReduce);
}

export const joinWordArrays = (wordArrays : string[][]) => {
    let cia = concatInnerArrays
    return cache<typeof cia>(concatInnerArrays, CACHE_FOLDER_PATH)(wordArrays);
}