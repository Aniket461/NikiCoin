const block = require('./models/block');
const indexes = require('./models/indexes');
const pendingtx = require('./models/pendingtransactions');
const transaction = require('./models/transactions');
const merkle = require('merkle');


var miningReward = 100;


async function MinePendingTransaction(mineraddress, blockindex, hash, nonce, transactions) {



    //Merkle root logic
    var array1 = [];
    transactions.forEach((b) => {
        array1.push(JSON.stringify(b));
    });
    console.log(array1);
    var merklerootans = merkle('sha256').sync(array1);
    var merkleroot = merklerootans.root();
    array1 = [];

    //get last blocks hash

    var lb =  await block.Block.find({});
    var prehash = lb[lb.length -1]['hash'];

    //add block to chain

    var newBlock = new block.Block({

        index:blockindex,
        transactions:transactions,
        previoushash:prehash,
        hash:hash,
        nonce:nonce,
        merkleroot:merkleroot,
        timestamp:Date.now()

    });

    var dd = await newBlock.save();


    //increase the block index by 1 in database

    
    var data = await indexes.IndexModel.find({});
    var blockindex = data[2].index;
    var data2 = await indexes.IndexModel.findOneAndUpdate({'name':"blockindex"}, { $set: {index:blockindex+1}});

    //push transactions to minedtransaction and remove them from pending transactions

    for(let i=0;i<transactions.length;i++){

        var newtx = new transaction.Transaction({

            From:transactions[i]['From'],
            To:transactions[i]['To'],
            amount:transactions[i]['amount'],
            timestamp:transactions[i]['timestamp'],
            signature:transactions[i]['signature'],
            index:transactions[i]['index'],
            confirm:transactions[i]['confirm']
        });
        
        var d1 = await newtx.save();
console.log("transaction blocked");

        var rem = await pendingtx.PendingTransaction.remove({'_id':transactions[i]['_id']});
        console.log("Transaction Removed");
    }

    

    //var datain = await indexes.IndexModel.find({});
    var newin = data[0].index;

    //create miner address
        //add miner transaction to pending transaction


    var minertx = new pendingtx.PendingTransaction({

        From:"System",
        To:mineraddress,
        amount:miningReward,
        timestamp:Date.now(),
        signature:"null",
        index:newin,
        confirm:"yes"
        
    });

    var cc = minertx.save();

    var data2 = await indexes.IndexModel.findOneAndUpdate({'name':"TransactionIndex"}, { $set: {index:newin+1}});


}


async function MiningFunction(mineraddress, blockindexpost, hash, nonce, transactions) {


    var data = await indexes.IndexModel.find({});
    var blockindex = data[2].index;


    //check for block availability
    if (blockindex.toString() != blockindexpost.toString()) {

        return ({ "data": "Someone Mined this block! Better luck next time" })

    }
    else {



        if (transactions.length > 0) {
            const cdate = Date.UTC();
            console.log("starting mining.... \n" + Date());
            MinePendingTransaction(mineraddress, blockindexpost, hash, nonce, transactions);
            console.log("Mining Ended at: " + Date());

            return ({ "data": "blockmined" });
        }
        else {
            console.log("\nNo transactions to be blocked");
            return ({ "data": "not enough transactions to Block" });
        }

    }
}


module.exports.MiningFunction = MiningFunction;