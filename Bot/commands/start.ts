import { Context } from "telegraf";
import DB from "../../database/db";

const start = async (ctx : Context) => {
    
    try {
        let db = new DB(Number(ctx.from?.id))
        await db.checkAndCreate()
    } catch (e) {
        console.log(e);
        
    }
    
    await ctx.reply(`Welcome User ${ctx.from?.id}`)
    
    
}

export default start