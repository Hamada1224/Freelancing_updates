import { Context } from "telegraf";
import DB from "../../../database/db";

class ChangeTags {
    constructor(ctx : Context , db : DB) {
        this.ctx = ctx
        this.db  = db
    }
    private ctx : Context 
    private db  : DB
    public static command = 'change_tags'
    
    public run = async (command = null) => {

        if (command !== null && command !== ChangeTags.command) {
            return 
        }

        const dbUpdate = await this.db.changeTagStatus(true)
        if (!dbUpdate) return await this.ctx.reply('Sorry We are facing technical Difficultaies ...')
        
        const currentTags:[] = await this.db.getTags()
        await this.ctx.reply(`Now You Can send Me a tags of which you are intersted in Seprated by , 
        ${ (currentTags.length == 0) ? "for example : php,nodejs,laravel,وردبريس,برمجة , ...etc" : `Your Current Tags ${currentTags.join(',')}`  }
        and i will search through Khamsat and Mostaql and Bring You All Projects that Contain Any of These Words
        Click Done When You Are Finished or Cancel if Are Fine With Current Tags
        `,{
            "reply_markup" : {
                "inline_keyboard" : [
                    [
                        {
                            "text" : "Cancel",
                            "callback_data" : 'cancelTags'
                        },
                        {
                            "text" : "Finish",
                            "callback_data" : 'finishTags'
                        }
                    ]
                ]
            }
        })
    }
}

// const changeTags = async (ctx:Context,db : DB) => {

//     const dbUpdate = await db.changeTagStatus(true)
//     if (!dbUpdate) return await ctx.reply('Sorry We are facing technical Difficultaies ...')
//     await ctx.reply(`Now You Can send Me a tags of which you are intersted in Seprated by , 
//     for example : php,nodejs,laravel,وردبريس,برمجة , ...etc
//     and i will search through Khamsat and Mostaql and Bring You All Projects that Contain Any of These Words
//     Click Done When You Are Finished or Cancel if Are Fine With Current Tags
//     `,{
//         "reply_markup" : {
//             "inline_keyboard" : [
//                 [
//                     {
//                         "text" : "Cancel",
//                         "callback_data" : 'cancelTags'
//                     },
//                     {
//                         "text" : "Finish",
//                         "callback_data" : 'finishTags'
//                     }
//                 ]
//             ]
//         }
//     })
// }

export default ChangeTags