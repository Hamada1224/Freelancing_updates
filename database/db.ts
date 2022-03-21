import knex from "knex";
import { join } from "path/posix";

class DB {
    
    constructor (id : number ) {
        this.userID = id
        this.db.migrate.latest({
            "directory" : join(__dirname,'database','migrations')
        })
    }

    private db = knex({
        "client" : process.env.driver,
        
        "connection" : {
            uri : process.env.DATABASE_URL
        }
    })
    private userID? : number ;

    // users 

    public checkId = async () => {
        const user = await this.db('users').where({"user_id" : this.userID})
        
        return user.length > 0  ;
    }
    
    private addUser = async () => {
    const check = await this.checkId()
    if (check) return true

    try {
    
        await this.db('users').insert({"user_id" : this.userID,"tags": JSON.stringify([])})
        return true
    
    } 
    catch (e) {
        return false
    }
    }
    
    public checkAndCreate =  async () => {
        const check = await this.checkId()
        if (!check) {
            await this.addUser()
        }

        return this ;
    }

    public deleteUser = async () => {
        
        const beforeDelete = (await this.db('users').count('*'))[0].count ;
        await this.db('users').where({"user_id" : this.userID }).delete()
        const afterDelete = (await this.db('users').count('*'))[0].count

        return afterDelete !== beforeDelete
    }

    public getUser = async () => {
        const check = await this.checkId()
        if(!check) return null
        else {
            return (await this.db('users').where({"user_id" : this.userID}))[0]
        }
    }

    // tags

    public getTags = async () => {

        
        const dbResult: any = (await this.db('users').where({"user_id" : this.userID}))[0].tags
        
        if( dbResult == null || dbResult.length == 0 ) return []
        return JSON.parse(dbResult).map((x:String) => x.replace(',',''))
    }

    public addTags = async (tag : any) => {
        
        let currentTags :any [] = await this.getTags()
        let updatedTags :any[]
        
        
        if (tag.includes(',')) {updatedTags = [...currentTags ,  ...tag.split(',') ]    }
        else                   {currentTags.push(`${tag}`) ; updatedTags = currentTags }
        
        try {
            
            await this.db('users').where({"user_id":this.userID}).update({"tags":JSON.stringify(updatedTags)})
        
            return this
        } catch (e) {
            throw e
        
        
    }
}
    public deleteAllTages = async () => {
        
        
        await this.db('users').where({"user_id" : this.userID}).update({"tags" : null});
        return this
        
    }

    public deleteTag = async (tag : string) => {
        let tags : string[] = await this.getTags()
        let updatedTags = tags.filter(x => (x !== tag) )

        await this.db('users').where({"user_id" : this.userID}).update({"tags" : JSON.stringify(updatedTags)})
        return this
    }

    public changeTagStatus = async (newStatus : boolean) => {
        const result = await this.db('users').where({"user_id" : this.userID}).update({"send_tags_status" : newStatus })
        
        return result == 1
        
    }

    //Cached Text 
    public addCacheText = async (text:string) => {
        const result = await this.db('users').where({"user_id":this.userID}).update({"cached_text":text})
        
        return result == 1 
        
    }
    public removeCachedTags = async () => {
        try {
            const result = await this.db('users').where({"user_id" : this.userID}).update({"cached_text" : ""})
            return result == 1
        } catch (e) {
            throw e
        }
        
    }
    private getCachedTags = async () => {
        try {
            const result = await this.db('users').where({"user_id":this.userID})
            return result[0].cached_text.trim()
        } catch (e) {
            throw e
        }
        
    }
    public saveCachedTags   = async () => {
        try {
            const cachedTags    = await this.getCachedTags()
            const currentTags   = await this.getTags()
            
            
            
            //  saveTags      
            // only if cached tags are not null
            if(cachedTags.trim().length > 0 ) await this.addTags(cachedTags)
            
            
            //  changeTagStatus  
            await this.changeTagStatus(false)
            
            
            await this.removeCachedTags()
            return 1
        
        } catch (e) {
            throw e
        }
        
    } 
}

export default DB