const blocks = require('./storeblock.json');
const merkle = require('merkle');
const fs = require('fs');

var array1 = [];

for(var i =0;i<blocks.length;i++){

    
    blocks[i].transactions.forEach((b)=>{
        array1.push(JSON.stringify(b[0]));
    });

console.log("==========================================");

    console.log(array1);

    var merklerootans = merkle('sha256').sync(array1);
console.log(blocks[i].index+"--"+merklerootans.root());
blocks[i].merkleroot = merklerootans.root();


console.log("==========================================");
console.log();
array1 = [];
    
}


const test = [{"name":"Aniket"},{"name":"Aniket1"},{"name":"Aniket2"},{"name":"Aniket3"}];

// var merkleroot = merkle('sha256').sync(array1);
// console.log(merkleroot.root());
// console.log(merkleroot.nodes());
// console.log(merkleroot.levels());
// console.log(merkleroot.level(2));
// console.log(merkleroot.level(1));
// console.log(merkleroot.level(0));


console.log("==================EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE=========================")

console.log(blocks);

fs.writeFile('./storeblock.json', JSON.stringify(blocks),(err)=>{

    if(err){console.log(err)}
    else{console.log("Updated blocks with merkle")}

});

