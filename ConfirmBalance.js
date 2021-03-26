//const blocksmined = require('./storeblock.json');
var readline = require('readline');
const { builtinModules } = require('module');
const pendingTx = require('./pendingtransactions.json');
var rl = readline.createInterface(process.stdin, process.stdout);

const blocks = require('./models/block');
const pen = require('./models/pendingtransactions');


async function getBalance(address){
    let balance = 0;

    var blocksmined = await blocks.Block.find({});
    var pentx = await pen.PendingTransaction.find({});


    for(const block of blocksmined){

        // console.log("=========");
        // console.log(block.transactions);
        // console.log("=========");

        for(const tran of block.transactions){

            //console.log("here tran "+(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address));
            
            if(JSON.stringify(tran['To']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance +    parseFloat(JSON.stringify(tran['amount']).replace('"'," ").replace('"'," ").trim());
                console.log("recived "+balance);
            }

            if(JSON.stringify(tran['From']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance - parseFloat(JSON.stringify(tran['amount']).replace('"'," ").replace('"'," ").trim());
                console.log("spent "+balance);
            }
        }
    }


    // for(const tran of pentx){

    //     // if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
    //     //     balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
    //     //     console.log("recived "+balance);
    //     // }

    //     if(JSON.stringify(tran['From']).replace('"'," ").replace('"'," ").trim() === address){
    //         balance = balance - parseFloat(JSON.stringify(tran['amount']).replace('"'," ").replace('"'," ").trim());
    //         console.log("spent "+balance);
    //     }
    // }

    //console.log(balance);

    return balance;
}

//GetNikiCoinAddress();

module.exports.confirmbalance = getBalance;