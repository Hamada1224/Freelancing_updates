import knex from "knex";
import config from "./knexfile"

class DB {
    
    constructor (id : number ) {
        this.userID = id
    }

    private env :any = process.env.env
    private config = config[this.env] 
    private db = knex(this.config)
    private userID? : number ;

    // users 

    private checkId = async () => {
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
        else                   {currentTags.push(`${tag},`) ; updatedTags = currentTags }
        
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
}

export default DB