import { Repository, Commit } from "nodegit";
import * as express from "express";
import * as path from "path";
import opn = require("opn");
interface StringListMap { [s: string]: string[] };

// see http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose.html
function wrap(fn) {
    return function(req:express.Request, res:express.Response, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res).then(returnVal => res.send(returnVal)).catch(next)
    }
}

async function recurse(rev: Commit, depth: number, network:StringListMap ) {
    if (depth == 0) return
    var parents = await rev.getParents(2)
    for (let parent of parents) {
        await recurse(parent, depth - 1, network)
        let h = String(rev);
        if (network[h] === undefined) {
            network[h] = []
        }    
        var pstr = String(parent)
        if (network[h].indexOf(pstr) == -1) {
            network[h].push(pstr)
        }
    }
}

async function read() {
    let repo = await Repository.open("../alsatian")
    
    async function getBranch(req: express.Request, res: express.Response) {
        var commit = await repo.getBranchCommit(req.params.branch)
        res.json({id: String(commit)})
    }

    async function getGraph(req: express.Request, res: express.Response) {
        let network : StringListMap = {}
        var head = await repo.getBranchCommit(req.params.branch)
        await recurse(head, 10, network)
        res.json({connections: network})
    }

    let app = express()
    app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')))
    app.get('/scripts/draw.js', (req, res) => res.sendFile(path.resolve(__dirname, 'draw.js')))
    app.get('/api1/heads/:branch', wrap(getBranch))
    app.get('/api1/graph/:branch', wrap(getGraph))
    let server = app.listen(0, () => { 
        console.log(`listening on ${server.address().port}`)
        opn(`http://127.0.0.1:${server.address().port}`)
    })
}

read()