import { Repository, Commit } from "nodegit";
import * as express from "express";
import * as path from "path";
import opn = require("opn");
interface StringListMap { [s: string]: string[] };

// see http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose.html
function wrap(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req).then(returnVal => res.send(returnVal)).catch(next);
    };
  }

async function recurse(rev: Commit, depth: number, network:StringListMap ) {
    if (depth == 0) return;
    var parents = await rev.getParents(10);
    for (let parent of parents) {
        await recurse(parent, depth - 1, network);
        let h = rev.id()+"";
        if (network[h] === undefined) {
            network[h] = [];
        }    
        network[h].push(parent+"");
    }
}

async function read() {
    let network:StringListMap = {};
    let repo = await Repository.open("../alsatian");
    let commit = await repo.getBranchCommit("master");
    let message =  await commit.message();
    let parents = await commit.getParents(2);
    for (let parent of parents) {
        console.log("parent "+parent);
        await recurse(parent, 10, network)
    }
}

let app = express();
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')))
let server = app.listen(0, () => { 
    console.log(`listening on ${server.address().port}`);    
    read();    
    opn(`http://127.0.0.1:${server.address().port}`);
});

