import { Context } from "telegraf";
import DB from "../../database/db";

const finishTags = async ( ctx :Context,db :DB) => {
    try {
        
        const result = await db.saveCachedTags()
        
        
        if(result == 1 ) {
            await ctx.deleteMessage()
            ctx.reply(`Saved Successfully`)
        }
        else {
            await ctx.reply('We are Facing Technical errors')
        }
    } catch (e) {
        console.log(e);
        
    }
    
}

const cancelTags = async (ctx :Context , db :DB) => {
    await db.changeTagStatus(false)
    ctx.deleteMessage()
    ctx.reply('Tag Change Cancled')
}

export {finishTags , cancelTags}