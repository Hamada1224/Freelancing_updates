import Filter from "./Filter/Filter";
import Providers from "./Providers/Provider";

class Scrapper {

    private providers = Providers ;
    private filter = new Filter(['تصميم'])
    
    private unFilteredProjects = async () => {
        return Promise.all(
            this.providers.map((_ : any) => _.projects())
        )

        .then(provider => {
            let projects = []
            for (let i = 0; i < provider.length; i++) {
               for (let x = 0; x < provider[i].length; x++) {
                   projects.push(provider[i][x])
               } 
            }
            return projects
        })
        
    }

    public projects = async () => {
        const allProjects  = await this.unFilteredProjects()
        let releventProjects =  allProjects.filter(x => this.filter.isRelevent(x.text))
        return releventProjects ;
    }
}

export default Scrapper