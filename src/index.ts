import filteredMessages from "filterMessages";
import parseJSON from "./parseJSON";

const FILEPATH = 'public/result.json';

const main = async () => {
    const dataObject = await parseJSON(FILEPATH);
}

main();
