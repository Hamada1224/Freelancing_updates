import DB from "./database/db";

let x = new DB(123);

    x
    .deleteAllTages()
    .then(x => x.addTags('php'))
    .then(x => x.getTags())
    .then(x => console.log(x))