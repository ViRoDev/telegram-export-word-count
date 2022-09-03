//Goal: Find Most popular words of user from Telegram Export file
//Init: We have result.json file from Telegram
//Project steps:
//[x]: From FILE to object
//[ ]: From object to an array of messages 
//[ ]: From messages to Filtered Messages:
//  - [ ] with special type (user text message)
//  - [ ] With property (in my case - user_id) with special value
//  - [ ] 'text' field should not be empty
//[ ] Divide each text message into arrays of words
//[ ] Combine those arrays into one array of words
//[ ] Process words
//  - [ ] Count each word appearence
//  - [ ] Sort words by appearence
//  - [ ] Get top results

import parseJSON from "./parseJSON";

const FILEPATH = 'src/result.json';

const main = async () => {
    const dataObject = await parseJSON(FILEPATH);
    console.log(dataObject);
}

main();
