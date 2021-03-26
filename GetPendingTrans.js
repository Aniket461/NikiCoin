var blocksmined = require('./storeblock.json');

const indexes = require('./models/indexes');
const block = require('./models/block');



async function getIndex(){
    var data = await indexes.IndexModel.find({});
    var blockindex;
    var difficulty;

   // var data =  await query.exec();

    blockindex = data[2].index;
    difficulty = data[1].index;

    return({"b":blockindex,"d":difficulty});
  


}

 async function Addprocessdata(data1) {


    //console.log("Here is data1:-"+JSON.stringify(data1));

    var blockindex;
    var difficulty;
    var trans={};

    var d = await getIndex();

    blockindex = d['b'];
    difficulty = d['d'];

  console.log("block "+blockindex);

  var lb =  await block.Block.find({});
  var prehash = lb[lb.length -1]['hash'];



    var procdata = [];
    var inc = 0;
        if(data1.length <4){
            console.log("There are not enough transactions to be mined!!");
            
        // let prevhash = getLatestBlock();
        // console.log(prevhash.hash);
        // console.log(blockindex);
        
          trans = {"index":blockindex,"transactions":null,"prevhash":prehash, "difficulty":difficulty};
            //return trans;
        }
        else{
    
            var count = 0;
            
        while (inc< data1.length && count<4) {
    
            //console.log(data1[inc]);
    
            if(data1[inc]['confirm'] == "yes"){
            
                procdata.push(data1[inc]);
                
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
        // let prevhash = getLatestBlock();
             trans = {"index":blockindex,"transactions":null,"prevhash":prehash, "difficulty":difficulty};
            //return trans;
        }
        else{
    
       // let prevhash = getLatestBlock();
        console.log("in Else");
        
         trans = {"index":blockindex,"transactions":procdata,"prevhash":prehash,"difficulty":difficulty};
    
        inc = 0;
        console.log(trans);
        //return {"index":blockindex,"transactions":procdata,"prevhash":prevhash.hash,"difficulty":difficulty};
        }
        }


    console.log("Return");
    return trans;

    
}

module.exports.GetData = Addprocessdata;
