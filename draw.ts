console.log("hello")
$.getJSON("/api1/graph/master", {}, (data:any) => {
    console.log(JSON.stringify(data));
})