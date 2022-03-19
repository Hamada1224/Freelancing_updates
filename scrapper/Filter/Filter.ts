class Filter {
    constructor(tags : Array<String>) {
     this.tags = tags   
    }
    private tags : Array<String>
    
    public isRelevent  = (projectText : String) => {
        return this.tags.some(
            (tag : any) => {
            return projectText.includes(tag)
        }
        )
    }
}

export default Filter 