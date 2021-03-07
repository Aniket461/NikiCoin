var blocksmined = require('./storeblock.json');


function getLatestBlock() {

    return blocksmined[blocksmined.length - 1]
}

 function Addprocessdata(data1) {


    console.log("Here is data1:-"+data1);

    var blockindex = require('./blockindex.json');
    
    var procdata = [];
var inc = 0;
    if(data1.length <4){
        console.log("There are not enough transactions to be mined!!");
        
     let prevhash = getLatestBlock();
    // console.log(prevhash.hash);
    // console.log(blockindex);
    
     var trans = {"index":blockindex[0].index,"transactions":null,"prevhash":prevhash.hash};
        return trans;
    }
    else{

    while (inc<4) {
        
            procdata.push(data1[inc]);
            //data1.splice(0, 1)
            inc++;
    
    }


    let prevhash = getLatestBlock();
    console.log(procdata);
    console.log(prevhash);
    console.log(blockindex);

    var trans = {"index":blockindex[0].index,"transactions":procdata,"prevhash":prevhash.hash};

    inc = 0;
    return trans;

    }

    
}

module.exports.GetData = Addprocessdata;
