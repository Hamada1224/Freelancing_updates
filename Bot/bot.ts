import { Telegraf } from "telegraf";
import { config as dotenv } from "dotenv";
import { join } from "path";
import start from "./commands/start";


const bot = () => {


    console.log('The Bot is Up');
    
dotenv({path : join(__dirname,'../','.env')})
const env         = process.env.env
const token       = process.env.token || ''
const url         = process.env.url   || 'localhost'
const port:any    = process.env.port  ||  3000

const bot         = new Telegraf(token)

bot.start(async ctx => await start(ctx))


if(env !== 'production') bot.launch()
else bot.launch({webhook : {"domain" : url , "port" : port}})

}

export default bot