import {Message} from 'messages.types'
import fs from 'fs'
import bfj from 'bfj'

export type TelegramExportResult = {
    name : string,
    type: string,
    id: number,
    messages: Array<Message>
}

const parseJSON = async (filepath: string) => 
    await bfj.parse(fs.createReadStream(filepath)) as TelegramExportResult;

export default parseJSON;