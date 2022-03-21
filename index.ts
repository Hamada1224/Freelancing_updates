import { Telegraf } from "telegraf";
import { config as dotenv } from "dotenv";
import { join } from "path";
import start from "./Bot/commands/botCommands/start";
import text from "./Bot/commands/botCommands/text";
import callback from "./Bot/callbackQueries/callbackquery";
import Commands from "./Bot/commands/commands";



const commands = Commands.getCommands().map(x => '/'+x)


console.log('The Bot is Up');
    
dotenv({path : join(__dirname,'.env')})

const env         = process.env.env
const token       = process.env.token || ''
const url         = process.env.url   || 'localhost'
const port        = (process.env.PORT as any)  ||  3000

const bot         = new Telegraf(token)

bot.start(              async ctx => await start(ctx))
bot.on('callback_query',async ctx => await callback(ctx))
bot.command(commands,         ctx => { new Commands(ctx)} )


bot.on('text',async ctx => await text(ctx))

if(env !== 'production') bot.launch()
else bot.launch({webhook : {"domain" : url , "port" : port}})
