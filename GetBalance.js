const blocksmined = require('./storeblock.json');
var readline = require('readline');
const { builtinModules } = require('module');
const pendingTx = require('./pendingtransactions.json');
var rl = readline.createInterface(process.stdin, process.stdout);


function GetNikiCoinAddress(){
    rl.question('\n Enter the nikicoin address \n',(answer)=>{

        console.log("The nikicoin balance of given address is: "+getBalance(answer));

    });
}

function getBalance(address){
    let balance = 0;

    for(const block of blocksmined){

        // console.log("=========");
        // console.log(block.transactions);
        // console.log("=========");

        for(const tran of block.transactions){

            //console.log("here tran "+(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address));
            
            if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
                console.log("recived "+balance);
            }

            if(JSON.stringify(tran[0]['From']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
                console.log("spent "+balance);
            }
        }
    }


    for(const tran of pendingTx){

        // if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
        //     balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
        //     console.log("recived "+balance);
        // }

        if(JSON.stringify(tran[0]['From']).replace('"'," ").replace('"'," ").trim() === address){
            balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
            console.log("spent "+balance);
        }
    }

    //console.log(balance);
rl.close();
    return balance;
}

//GetNikiCoinAddress();

module.exports.getbalance = getBalance;