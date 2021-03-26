// // // const SHA256 = require('crypto-js/sha256');
// // // const utf8 = require('utf-8');

// // // //console.log(SHA256("Aniket").toString());


// // // var blocksmined = require('./storeblock.json');


// // // // e7aba49b47b34ddfe3d9d4fe00af9b490612859faa2194b0ab8058825d7aad27
// // // // e7aba49b47b34ddfe3d9d4fe00af9b490612859faa2194b0ab8058825d7aad27



// // // function calculateHashJSON(index, data, previoushash, nonce) {

// // //     //console.log(index + "--" +data + "--" + previoushash + "--" +nonce + "--")
// // //     return SHA256(index + JSON.stringify(data) + previoushash + nonce).toString();
// // // }

// // // // flutter: 2186
// // // // flutter: 00078c054087e75cda9e9c706befe2e444cf54d76d57840d10d18a59f8753bba

// // // // flutter: 9519
// // // // flutter: 000d4075f84b7c6b745c3850927fc07ea812f81bde67fa5e6ee9ada723fa10bd

// // // function toUTF8Array(str) {
// // //     var utf8 = [];
// // //     for (var i=0; i < str.length; i++) {
// // //         var charcode = str.charCodeAt(i);
// // //         if (charcode < 0x80) utf8.push(charcode);
// // //         else if (charcode < 0x800) {
// // //             utf8.push(0xc0 | (charcode >> 6), 
// // //                       0x80 | (charcode & 0x3f));
// // //         }
// // //         else if (charcode < 0xd800 || charcode >= 0xe000) {
// // //             utf8.push(0xe0 | (charcode >> 12), 
// // //                       0x80 | ((charcode>>6) & 0x3f), 
// // //                       0x80 | (charcode & 0x3f));
// // //         }
// // //         // surrogate pair
// // //         else {
// // //             i++;
// // //             // UTF-16 encodes 0x10000-0x10FFFF by
// // //             // subtracting 0x10000 and splitting the
// // //             // 20 bits of 0x0-0xFFFFF into two halves
// // //             charcode = 0x10000 + (((charcode & 0x3ff)<<10)
// // //                       | (str.charCodeAt(i) & 0x3ff))
// // //             utf8.push(0xf0 | (charcode >>18), 
// // //                       0x80 | ((charcode>>12) & 0x3f), 
// // //                       0x80 | ((charcode>>6) & 0x3f), 
// // //                       0x80 | (charcode & 0x3f));
// // //         }
// // //     }
// // //     return utf8;
// // // }


// // // function cal(){

// // //     var m = {"From": "0001xsx", "To": "00012312", "amount": 10};
// // //     console.log(JSON.stringify(m).split('"').join("").split(":").join(": ").split(',').join(", "));
// // //     const encoded = utf8.setBytesFromString(JSON.stringify(m).split('"').join("").split(":").join(": ").split(',').join(", ")+ 100);
// // //     console.log(encoded);
// // //     const en2 = [123, 70, 114, 111, 109, 58, 32, 48, 48, 48, 49, 120, 115, 120, 44, 32, 84, 111, 58, 32, 48, 48, 48, 49, 50, 51, 49, 50, 44, 32, 97, 109, 111, 117, 110, 116, 58, 32, 49, 48, 125, 49, 48, 48];
// // //     console.log(en2);
// // //     console.log(SHA256(en2).toString());
// // //     console.log(SHA256(encoded).toString());

// // //     var mm = JSON.stringify(m).split('"').join("").split(":").join(": ").split(',').join(", ");

// // //     const block = blocksmined[21];
// // //     //console.log(JSON.stringify(block.transactions))

// // //     var hash = "hdhdhhshhs";
// // //     var nonce = 0;

// // //     while (hash.substring(0, 3) !== Array(3 + 1).join(0)) {
        
// // //         hash = SHA256(encoded.toString()+ nonce).toString();
// // //         //console.log(hash);
// // //         nonce++;
// // //         // console.log(this.hash+"\n")
// // //     }

// // //     console.log(nonce);
// // //     console.log("Block Mined...\n" + hash);

// // // }


// // // function isChainValidJson() {
// // //     for (let i = 1; i < blocksmined.length; i++) {

// // //         const curblock = blocksmined[i];
// // //         const prevblock = blocksmined[i - 1]

// // //         //console.log(curblock.index +"and"+curblock.hash);
// // //         //console.log(prevblock);
// // //         console.log(curblock.index);

// // //         if(curblock.index<22){

// // //         if (curblock.hash !== calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce)) {

// // //             //console.log(curblock.index);
// // //             console.log(curblock.hash);
// // //             //console.log(curblock.index +"\n"+ curblock.transactions +"\n"+ curblock.previoushash +"\n"+ curblock.nonce)
// // //             console.log(calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce));

            
// // //             //console.log("1");
// // //             return false;
// // //         }
// // //         if (curblock.previoushash !== prevblock.hash) {
// // //             //console.log("2");
// // //             console.log("second if "+curblock.index);
// // //             return false
// // //         }
// // //     }
// // //     else{

// // //         utf8.setBytesFromString(JSON.stringify(m).split('"').join("").split(":").join(": ").split(',').join(", "));

// // //         if (curblock.hash !== calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce)) {

// // //             //console.log(curblock.index);
// // //             console.log(curblock.hash);
// // //             //console.log(curblock.index +"\n"+ curblock.transactions +"\n"+ curblock.previoushash +"\n"+ curblock.nonce)
// // //             console.log(calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce));

            
// // //             //console.log("1");
// // //             return false;
// // //         }
// // //         if (curblock.previoushash !== prevblock.hash) {
// // //             //console.log("2");
// // //             console.log("second if "+curblock.index);
// // //             return false
// // //         }

// // //     }

// // //         //console.log(i+" and "+ (i-1) +" are right");

// // //     }
// // //     return true;
// // // }





// // // //console.log("Is the chain valid? "+isChainValidJson());

// // // cal();

//  const fs = require('fs');



// // var trans = [
// //     {
// //         "index":1
// //     },
// //     {
// //         "From": "System",
// //         "To": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
// //         "amount": 10000,
// //         "timestamp": Date.now()
        
// //     },
// //     {
// //         "signature": "null"
// //     },
// //     {
// //         "confirm":"yes"
// //     }
// // ];


// // const pending = require('./pendingtransactions.json');

// // pending.push(trans);

// // fs.writeFile('./pendingtransactions.json', JSON.stringify(pending),(err=>{

// //     if(err){console.log(err)}
// //     else{
// //         console.log("Transaction added");
// //     }


// // }));


// var blocksmined = require('./storeblock.json');

// blocksmined.forEach((b)=>{
//     b.nonce = b.nonce -1;
// })


// fs.writeFile('./storeblock.json', JSON.stringify(blocksmined),(err=>{

//     if(err){console.log(err)}
//     else{
//         console.log("Updated");
//     }


// }));




const pending = require('./models/pendingtransactions');
const indexes = require('./models/indexes');
const block = require('./models/block');
const status = require('./models/status');



async function InitialTx(){

for(let i =0;i<4;i++){

var data = await indexes.IndexModel.find({});
var newindex = data[0].index;

var newpen = new pending.PendingTransaction({

    From:"System",
    To:"04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
    amount:10000,
    timestamp:Date.now(),
    signature:"null",
    index:newindex,
    confirm:"yes"
});

var tx = await newpen.save();

var data2 = await indexes.IndexModel.findOneAndUpdate({'name':"TransactionIndex"}, { $set: {index:newindex+1}});

console.log("transaction added");
}

return({"data":"Done"});


// var lb = await block.Block.find({});
// var prevhash = lb[lb.length -1]['hash']

// return({"data":prevhash});

// var st = new status.Status({

//     index:1,
//     status:"Valid",
//     timestamp:Date.now(),
//     message:"Chain is Valid and stable"
    
// });

// var t = await st.save()

// return({"data":"done"});


}

module.exports.Initial = InitialTx;