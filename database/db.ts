import knex from "knex";
import config from "./knexfile"

class DB {
    
    constructor (id : Number) {
        this.userID = id
    }

    private config = config.development 
    private db = knex(this.config)
    private userID : Number ;

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


    // tags
    public getTags = async () => {

        
        const dbResult: string = (await this.db('users').where({"user_id" : this.userID}))[0].tags
        if(JSON.parse(dbResult).length == 0 ) return []
        return JSON.parse(dbResult)
    }

    public addTags = async (tag : any) => {
        
        let currentTags = await this.getTags()
        let updatedTags :any[]
        
        
        
        if (tag.includes(',')) updatedTags = [...currentTags ,  ...tag.split(',')]
        else currentTags.push(`${tag},`) ; updatedTags = currentTags
        // console.log(updatedTags);
        
        
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
}

export default DB