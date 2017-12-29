$.getJSON("/api1/graph/master", {}, (serverdata) => {
    let mynetwork = document.getElementById('mynetwork');
    let options  = {}    
    let edgeset = []
    let nodeset = []
    let seen= {}
    let count = 1;
    function visit(node) {
        if (seen[node] === undefined) {
            nodeset.push( {id:count, label:node.substring(0,8)});
            seen[node] = count
            count = count + 1
        }
    }

    for (let com in serverdata.connections) {
        visit(com);
        for (let parent of serverdata.connections[com]) {
            visit(parent);
            edgeset.push( { from:seen[com], to:seen[parent]});
        }
    }
    console.log(JSON.stringify({nodes:nodeset, edges:edgeset}));
    let nodes = new vis.DataSet(nodeset)
    let edges = new vis.DataSet(edgeset)
    let graphdata = { nodes:nodes, edges: edges}
    let network = new vis.Network(mynetwork, graphdata, options)
    $('body').append(`<div> loaded ${serverdata.reponame}</div>`)
})
