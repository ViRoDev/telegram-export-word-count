import { createHash } from "crypto"
import fs from 'fs'

//reminder that result of hash isn't just regular string
type hex = string;
export const sha256Hex = (...args : any) : hex => 
    createHash('sha256').update(args.toString()).digest('hex');

export const cache = <T>(func : Function, cacheFolderPath : string = '.cache') => {
    type cacheObjectType = { [hash: string] : any}   
    const memFunc = (...args : any) => {
        const cacheHex = sha256Hex(func.toString(), args.toString())
        const functionCachePath = `${cacheFolderPath}/${cacheHex}`;
        let mem : cacheObjectType = {};

        try { 
            mem = JSON.parse(
            fs.readFileSync(functionCachePath)
            .toString()) as cacheObjectType;
        }
        catch(err) {
            console.log(`No cached files found. New dictionary will be created...`)
        }
        
        if(!mem[cacheHex]) {
            //TODO: make encryption/decryption of function call result
            const funcResults = func(...args);
            mem[cacheHex] = funcResults;

            try { fs.writeFileSync(functionCachePath, JSON.stringify(mem)) }
            catch (err) { 
                console.log(
                    `Could not create cache file at ${functionCachePath}. \n
                    Complete error: ${err}`)
            }
        }
        return mem[cacheHex]
    }
    return memFunc as T;
}

