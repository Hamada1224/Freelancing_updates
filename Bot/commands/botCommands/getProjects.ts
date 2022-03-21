import { Context } from "telegraf";
import DB from "../../../database/db";
import Project from "../../../classes/project";
import Scrapper from "../../../scrapper/scrap";

class GetProjects {
    
    constructor(ctx : Context,db : DB) {
        this.ctx = ctx
        this.db = db    
    }
    
    private ctx : Context
    private db : DB

    public static command = 'get_projects'

    public run = async () => {
        const tags = await this.db.getTags()
        const scrapper = new Scrapper(tags)

        const projects = await scrapper.projects()

        projects.forEach((project : Project) => {
            this.ctx.reply(`<a href="${project.link}">${project.text}</>`,{
                "parse_mode" : "HTML"
            })
        })

    }


}

export default GetProjects