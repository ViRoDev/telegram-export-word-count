import parseJSON from "./parseJSON";

const FILEPATH = 'src/result.json';

const main = async () => {
    const dataObject = await parseJSON(FILEPATH);
    console.log(dataObject);
}

main();
