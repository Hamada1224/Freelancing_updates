import axios from "axios";
import { load } from "cheerio";
class Mostaql {
    private productionUrl  = 'https://mostaql.com/projects/development';
    private developmentUrl = 'http://localhost/mostaql.txt';
    private activeUrl = this.developmentUrl

    private fetch = async () => {
        const x = await axios(this.activeUrl);
        return x.data;
    }
    
    public projects = async () => {
        
        let _ = await this.fetch()
        let $ = load(_);
        
        const unHandledProjects =  ($('.mrg--bt-reset'))
        let projects = []
        
        for (let i = 0; i < unHandledProjects.length; i++) {
            projects.push(this.extractInfo(unHandledProjects[i]));
        }
        
        return projects 
    }

    private extractInfo = (_: any ) => {
         const projectText  = _.children[1].children[0].data
         const projectLink  = _.children[1].attribs.href
        
         return {
            text : projectText ,
            link : projectLink
        }
}
   

}

export default Mostaql