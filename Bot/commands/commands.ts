import { Context } from "telegraf";
import DB from "../../database/db";
import ChangeTags from "./botCommands/changeTags";
import GetProjects from "./botCommands/getProjects";

class Commands {

    constructor(ctx : Context) {
        
        this.ctx = ctx
        this.command = ((ctx.message as any).text as string).replace('/','')
        this.db = new DB(Number(ctx.from?.id))
        
        this.runner()
    }
    
    private db  : DB 
    private ctx : Context
    
    
    private command : string
    private static commandsToRun: any[] = [ChangeTags,GetProjects];

    private runner = () => {

        Commands.commandsToRun.forEach( async _ => {
            const x = new _(this.ctx,this.db)
            await x.run(this.command)
            
        })
    }
    
    static getCommands = () => Commands.commandsToRun.map(x => x.command)
}

export default Commands