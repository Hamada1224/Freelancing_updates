import axios from "axios";
import { Cheerio , CheerioAPI, CheerioOptions, Element, load } from "cheerio";



class Khamsat  {
    
    private domainName     = 'https://khamsat.com';
    private productionUrl  = 'https://khamsat.com/community/requests';
    private developmentUrl = 'http://localhost/khamsat.txt'
    private activeUrl = this.developmentUrl
    

    private fetch = async () => {
        const x = await axios(this.activeUrl);
        return x.data;
    }
    
    public projects = async () => {
        
        let _ = await this.fetch()
        let $ = load(_);
        
        const unHandledProjects =  ($('.ajaxbtn'))
        let projects = []
        
        for (let i = 0; i < unHandledProjects.length; i++) {
            projects.push(this.extractInfo(unHandledProjects[i]));
        }
        
        return projects
    }

    private extractInfo = (_: any ) => {
         const projectText  = _.children[0].data
         const projectLink  = _.attribs.href
        
         return {
            text : projectText ,
            link : this.domainName + projectLink
        }
}
    

}

export default Khamsat