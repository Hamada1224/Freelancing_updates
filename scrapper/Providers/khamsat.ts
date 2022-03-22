import axios from "axios";
import { load } from "cheerio";
import Project from "../../classes/project";


class Khamsat  {
    
    private domainName     = 'https://khamsat.com';
    private productionUrl  = 'https://khamsat.com/community/requests';
    private developmentUrl = 'http://localhost/khamsat.txt'
    private activeUrl      = ((process.env.env as string) == 'development') ? this.developmentUrl : this.productionUrl ; 
    

    private fetch = async () => {
        const x = await axios({
            "url" : this.activeUrl,
            "method" : "GET",
            "headers" : {
                "user-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36"
            }
        });
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
        
         return new Project(this.domainName + projectLink , projectText)
}
    

}

export default Khamsat