import { Context } from "telegraf";
import DB from "../../../database/db";
import ChangeTags from "./changeTags";

const start = async (ctx : Context) => {
    
    try {
        let db = new DB(Number(ctx.from?.id))
        
        const userExistsnce = await db.checkId()
        
        if (userExistsnce) return await  ctx.reply(`Welcome Back ${ctx.from?.first_name} ${ctx.from?.last_name || ''}`)
        else {
            await db.checkAndCreate()
            await ctx.reply(`Welcome ${ctx.from?.first_name} ${ctx.from?.last_name || ''}`)
            const _ = new ChangeTags(ctx,db)
            await _.run()
        }
        
    } catch (e) {
        await ctx.reply('Sorry am Facing technincal Problem ...')
        console.log(e);
        
    }
    
        
    
}

export default start