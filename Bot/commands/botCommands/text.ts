import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import DB from "../../../database/db";

const text = async (ctx:Context) => {
    const db = new DB(Number(ctx.from?.id))
    const user = await db.getUser()
    if (user == null) return await ctx.reply('Please Use Command Start First !')
    else {
        if(!user.send_tags_status) return await ctx.reply(`I Cant't Understand You ? , if you are tring to add tags please use add tags command `)
        else {

            const text = (ctx.message as any).text
            await db.addCacheText(text)
            
            await ctx.reply(`Ok Saved That , Click Cancel when you are Done `)

        }
    }

}

export default text