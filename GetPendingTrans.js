var blocksmined = require('./storeblock.json');



function getLatestBlock() {

    return blocksmined[blocksmined.length - 1]
}

 function Addprocessdata(data1) {


    //console.log("Here is data1:-"+JSON.stringify(data1));

    var blockindex = require('./blockindex.json');
    var difficulty = require('./Difficulty.json');

    var procdata = [];
var inc = 0;
    if(data1.length <4){
        console.log("There are not enough transactions to be mined!!");
        
     let prevhash = getLatestBlock();
    // console.log(prevhash.hash);
    // console.log(blockindex);
    
     var trans = {"index":blockindex[0].index,"transactions":null,"prevhash":prevhash.hash, "difficulty":difficulty[0].difficulty};
        return trans;
    }
    else{

        var count = 0;
    while (inc< data1.length && count<4) {

        console.log(JSON.stringify(data1[inc][3].confirm).replace('"','').replace('"',''))
        console.log(inc);
        if(JSON.stringify(data1[inc][3].confirm).replace('"','').replace('"','') === 'yes'){
        
            procdata.push(data1[inc]);
            //data1.splice(0, 1)
            inc++;
            count++;
            
        }
        else{
            inc++;
        }
        
    
    }

    console.log("After While");

    if(procdata.length <4){
        
        console.log("In If");
     let prevhash = getLatestBlock();
        var trans = {"index":blockindex[0].index,"transactions":null,"prevhash":prevhash.hash, "difficulty":difficulty[0].difficulty};
        return trans;
    }
    else{

    let prevhash = getLatestBlock();
    //console.log(JSON.stringify(procdata));
    //console.log(prevhash);
    //console.log(blockindex);

    var trans = {"index":blockindex[0].index,"transactions":procdata,"prevhash":prevhash.hash,"difficulty":difficulty[0].difficulty};

    inc = 0;
    return trans;
    }
    }

    
}

module.exports.GetData = Addprocessdata;
