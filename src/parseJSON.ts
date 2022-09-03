import fs from 'fs'
import bfj from 'bfj'

const parseJSON = async (filepath: string) => 
    await bfj.parse(fs.createReadStream(filepath))

export default parseJSON;