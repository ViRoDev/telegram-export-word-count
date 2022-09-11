import { createHash } from "crypto"
import fs from 'fs'

//reminder that result of hash isn't just regular string
type hex = string;
export const sha256Hex = (...args : any) : hex => 
    createHash('sha256').update(args.toString()).digest('hex');

export const cache = <T>(func : Function, cacheFolderPath : string = '.cache') => {
    type cacheObjectType = { [key: string] : any}
    // let mem : cacheObjectType;
    // try {
    //     mem = JSON.parse(fs.readFileSync(cacheFolderPath).toString()) as cacheObjectType;
    // }
    // catch(err) {
    //     console.log('Cache file not found... Creating empty cache');
    //     mem = {}
    // }
    
    const memFunc = async (...args : any) => {
        const functionCacheHex = sha256Hex(func.toString(), args)
        console.log(func.toString())
        let mem : cacheObjectType;
        const functionCachePath = `${cacheFolderPath}/${functionCacheHex}`;
        try { 
            mem = JSON.parse(
            fs.readFileSync(functionCachePath)
            .toString()) as cacheObjectType;
        }
        catch(err) {
            mem = {};
        }
        
        if(!mem[functionCacheHex]) {
            //TODO: make encryption/decryption of function call result
            mem[functionCacheHex] = await func(...args);

            try { fs.writeFileSync(functionCachePath, JSON.stringify(mem)) }
            catch (err) { 
                console.log(
                    `Could not create cache file at ${cacheFolderPath}. \n
                    Complete error: ${err}`)
            }
        }
        return mem[functionCacheHex]
    }
    return memFunc as T;
}

