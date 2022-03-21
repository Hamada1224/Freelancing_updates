import { Context } from "telegraf";
import DB from "../../database/db";
import { cancelTags, finishTags } from "./tags";

const callback = async (ctx:Context) => {
    
    const command = (ctx.callbackQuery as any).data
    const db = new DB(Number(ctx.from?.id))
    
         if (command == 'finishTags') await finishTags(ctx,db)
    else if (command == 'cancelTags') await cancelTags(ctx,db) 
    
}
export default callback