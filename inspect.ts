import { Repository, Commit } from "nodegit";

async function recurse(rev: Commit, depth: number ) {
    if (depth == 0) return;
    console.log("at "+rev+" depth "+depth)
    var parents = await rev.getParents(10);
    for (let parent of parents) {
        console.log(`${rev}->${parent}`);
        recurse(parent, depth - 1);
    }
}

async function read() {
    let repo = await Repository.open("../alsatian");
    let commit = await repo.getBranchCommit("master");
    let message =  await commit.message();
    let parents = await commit.getParents(2);
    console.log("message "+message);
    console.log("|parents| = "+parents.length);
    for (let parent of parents) {
        console.log("parent "+parent);
        recurse(parent, 10)
    }
    console.log("Done");
}

read();
