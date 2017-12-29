import { Repository, Commit } from "nodegit";
import * as express from "express";

interface StringListMap { [s: string]: string[] };

async function recurse(rev: Commit, depth: number, network:StringListMap ) {
    if (depth == 0) return;
    var parents = await rev.getParents(10);
    for (let parent of parents) {
        await recurse(parent, depth - 1, network);
        console.log("parent "+parent);
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

read();
