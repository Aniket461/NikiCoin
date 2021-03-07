
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
var data = require('./pendingtransactions.json');
var minedtrans = require('./blockedtransactions.json');
var blockindex = require('./blockindex.json');
var blocksmined = require('./storeblock.json');





var procdata = [];

var inc = 0;




function Addprocessdata(data) {


    if(data.length <4){
        console.log("There are not enough transactions to be mined!!");
    }
    else{

    while (inc<4) {
        
            procdata.push(data[0]);
            data.splice(0, 1)
            inc++;
    
    }

    // fs.writeFile('./pendingtransactions.json', JSON.stringify(data),err=>{
    //     if(err) console.log(err)
    //     else console.log("Done!");
    // })

    }


    // for(var i= 0;i<data.length;i++){
    //     if(data[i].blocked == "No"){

    //         procdata.push(data[i]);
    //          delete data[i]
    //     }
    // }
}

class Block {
    constructor(index, transactions, previoushash = '') {

        this.index = index;
        this.transactions = transactions;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {

        return SHA256(this.index + JSON.stringify(this.transactions) + this.previoushash + this.nonce).toString();
    }



    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0)) {
            this.nonce++;
            this.hash = this.calculateHash();
            // console.log(this.hash+"\n")
        }

        console.log("Block Mined...\n" + this.hash);

    }
}



function calculateHashJSON(index, data, previoushash, nonce) {

    return SHA256(index + JSON.stringify(data) + previoushash + nonce).toString();
}

class BlockChain {


    constructor() {
        this.chain = [];
        this.pendingtransactions = [];
        this.difficulty = 5;
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2021", { amount: 4 }, "0",);
    }

    getLatestBlock() {

        return blocksmined[blocksmined.length - 1]
    }


    //not useful anymore
    addBlock(newBlock) {

        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        blocksmined.push(newBlock);
        console.log("New block is:- " + JSON.stringify(newBlock) + "\n");



    }


    MinePendingTransaction(miningRewardAddress, blockindexpost, hash, nonce){

        let block = new Block(blockindexpost,procdata, this.getLatestBlock().hash);
        //block.mineBlock(this.difficulty);
        block.hash = hash;
        block.nonce = nonce;
        console.log("Block mined");
        this.chain.push(block);
        blocksmined.push(block);

        for(var i = 0;i<procdata.length;i++){
            minedtrans.push(procdata[i]);
        }

        var trans = [
            {
                "From": "null",
                "To": miningRewardAddress,
                "amount": "100",
                "timestamp": Date.now()
                
            },
            {
                "signature": "null"
            }
        ];

        data.push(trans);
        
    fs.writeFile('./blockedtransactions.json', JSON.stringify(minedtrans), err => {
        if (err) console.log(err);
        console.log("Updated!");
    })

    
    fs.writeFile('./pendingtransactions.json', JSON.stringify(data), err => {
        if (err) console.log(err);
        console.log("Updated!");
    })

    

    fs.writeFile('./storeblock.json', JSON.stringify(blocksmined), err => {
        if (err) console.log(err);

        console.log("Blocks added");
    })


    blockindex[0]['index'] = blockindex[0]['index'] + 1;
        console.log(blockindex[0]['index'] + "index here")
        fs.writeFile('./blockindex.json', JSON.stringify(blockindex), err => {
            if (err) console.log(err)
            else console.log("index updated");
        })

        console.log("New block is:- " + JSON.stringify(block) + "\n");
        
        

    }


    //not useful
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previoushash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }


}

function isChainValidJson() {
    for (let i = 1; i < blocksmined.length; i++) {

        const curblock = blocksmined[i];
        const prevblock = blocksmined[i - 1]

        //console.log(curblock);
        //console.log(prevblock);

        if (curblock.hash !== calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce)) {

            console.log(curblock.hash);
            console.log(calculateHashJSON(curblock.index, curblock.transactions, curblock.previoushash, curblock.nonce));

            console.log("1");
            return false;
        }
        if (curblock.previoushash !== prevblock.hash) {
            console.log("2");
            return false
        }

    }
    return true;
}

function getBalance(address){
    let balance = 0;

    for(const block of blocksmined){

        // console.log("=========");
        // console.log(block.transactions);
        // console.log("=========");

        for(const tran of block.transactions){

            console.log("here tran "+(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address));
            if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']));
            }

            if(JSON.stringify(tran[0]['From']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance - parseFloat(JSON.stringify(tran[0]['amount']));
            }
        }
    }

    return balance;
}







//===================================
//sort the ValidChain - done
//===================================

//===================================
//Convert this to Node api and make front end 
//===================================



function MiningFunction(mineraddress, blockindexpost, hash,nonce){


    console.log("===================")
    console.log(blockindex[0]['index']);
    console.log(blockindexpost)
    console.log("===================")

    if(blockindex[0]['index'].toString() != blockindexpost.toString()){

        return({"data":"Someone Mined this block! Better luck next time"})

    }
    else{


    let nikicoin = new BlockChain();


    Addprocessdata(data);

//console.log(procdata);
//console.log(data.length);
//console.log(data);

if (procdata.length > 0) {
    const cdate = Date.UTC();
    console.log("starting mining.... \n" + Date());
    nikicoin.MinePendingTransaction(mineraddress,blockindexpost, hash, nonce);
    console.log("Mining Ended at: " + Date());

//     console.log();
// if(isChainValidJson()){
//     console.log("\nThe block chain is in VALID state");
// }
// else{
//     console.log("\nThe blockchain is in INVALID state");
// }


    return({"data":"blockmined"});
}
else {
    console.log("\nNo transactions to be blocked");
    return({"data":"not enough transactions to Block"});
}

//console.log("The balance for given address is:-"+getBalance("nikiaddress"));
    }
}


module.exports.MineBlock = MiningFunction;











    // for (var i = 0; i < procdata.length; i++) {
    //     console.log(`\n Minning Block ${i + 1}...\n`);
    //     nikicoin.addBlock(new Block(blockindex[0]['index'], procdata[i]))
    //     blockindex[0]['index'] = blockindex[0]['index'] + 1;
    //     console.log(blockindex[0]['index'] + "index here")
    //     fs.writeFile('./blockindex.json', JSON.stringify(blockindex), err => {
    //         if (err) console.log(err)
    //         else console.log("index updated");
    //     })
    //     minedCoin += 20;
    //     console.log("Your Nikicoin balance is: " + minedCoin);
    //     procdata[i].blocked = "Yes";
    //     data.push(procdata[i]);
    // }




//console.log(data);
//


// const cdate = Date.UTC();
// console.log("starting mining \n"+Date());
// console.log("\n Minning Block 1...\n");
// nikicoin.addBlock(new Block(1,"10/01/2021",{amount: 10}))
// minedCoin +=20;
// console.log("Your Nikicoin balance is: "+minedCoin);
// console.log("starting mining \n"+Date());
// console.log("\n Minning Block 2...\n");
// nikicoin.addBlock(new Block(2,"12/01/2021",{amount: 100}))
// minedCoin +=20;
// console.log("Your Nikicoin balance is: "+minedCoin);
// console.log("starting mining \n"+Date());
// console.log("\n Minning Block 3...\n");
// nikicoin.addBlock(new Block(3,"15/01/2021",{amount: 150}))
// minedCoin +=20;
// console.log("Your Nikicoin balance is: "+minedCoin);
// console.log("Mining Ended at: "+Date());
// console.log(JSON.stringify(nikicoin, null, 4))
// console.log(nikicoin.isChainValid());

// nikicoin.chain[1].data = {amount:1000};
// console.log(JSON.stringify(nikicoin, null, 4))
// console.log(nikicoin.isChainValid());
