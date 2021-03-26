
var data = require('./pendingtransactions.json');
const blocksmined = require('./storeblock.json');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');
const transactionSchema = require('./models/pendingtransactions');
const indexes = require('./models/indexes');
const gb = require('./GetBalance');



var privateKey;

sender = "";
reciever = "";
amount = 0;

var set = { "From": "", "To": "", "amount": 0, "timestamp": "", "blocked": "No" };


var trans = [{ "From": "", "To": "", "amount": 0, "timestamp": "" },
{ "signature": "" }, { "index": 0 }, { "confirm": "no" }];


function SetTransaction(from, to, amount, privateKey, date) {

    trans[0].From = from;
    trans[0].To = to;
    trans[0].amount = amount;
    trans[0].timestamp = date;

    console.log(trans);

    const myKey = ec.keyFromPrivate(privateKey);
    let res = signTransaction(trans, myKey);

    return res;


}



function calculateHash(transaction) {

    return SHA256(transaction[0]).toString();
}

async function signTransaction(transaction, signingKey) {

    if (signingKey.getPublic('hex') !== transaction[0]['From']) {
        console.log("You cannot sign someone elses wallet")
        return ({ "data": "Signing Error" });
    }
    else {

        const hashtx = calculateHash(transaction);
        const sig = signingKey.sign(hashtx, 'base64');
        const signature = sig.toDER('hex');
        trans[1].signature = signature;



        if ( gb.getbalance(transaction[0]['From']) >= transaction[0]['amount']) {


            if (isValid(transaction)) {


                var data2 = { "data": "" };

                var d = 0;
                await indexes.IndexModel.find({ 'name': "TransactionIndex" }, async (err, data) => {

                    console.log(data[0]['index']);
                    d = data[0]['index'];

                    console.log(d + 1);
                    indexes.IndexModel.findOneAndUpdate({ 'name': "TransactionIndex" }, {
                        $set: {
                            index: d + 1
                        }
                    }).then(async () => {


                        var tx = new transactionSchema.PendingTransaction({
                            From: trans[0].From,
                            To: trans[0].To,
                            amount: trans[0].amount,
                            timestamp: trans[0].timestamp,
                            signature: trans[1].signature,
                            index: d,
                            confirm: trans[3].confirm
                        });

                        await tx.save((err) => {
                            if (err) {
                                console.log(err);

                                data2['data'] = "Error in Creating Transaction";
                            }
                            else {
                                console.log("transaction added")

                                data2['data'] = "Transaction Successful";
                                console.log("inn--" + data2);

                            };
                        });
                    }).catch((e) => {
                        console.log(e);

                        data2['data'] = "Error in creating transaction";
                    });


                });



                console.log(data2);
                return ({ "data": "Transaction Successful!" });


            }


            else {
                console.log("Transaction is not valid");
                return ({ "data": "Signing Error" });
            }

        }
        else {
            console.log("You do not have enough nikicoins!!!");
            return ({ "data": "No Coins" });
        }
    }
}




function getBalance(address) {
    let balance = 0;

    for (const block of blocksmined) {


        for (const tran of block.transactions) {

            if (JSON.stringify(tran[0]['To']).replace('"', " ").replace('"', " ").trim() === address) {
                balance = balance + parseFloat(JSON.stringify(tran[0]['amount']).replace('"', " ").replace('"', " ").trim());

            }

            if (JSON.stringify(tran[0]['From']).replace('"', " ").replace('"', " ").trim() === address) {
                balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"', " ").replace('"', " ").trim());

            }
        }
    }

    for (const tran of data) {



        if (JSON.stringify(tran[0]['From']).replace('"', " ").replace('"', " ").trim() === address) {
            balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"', " ").replace('"', " ").trim());
            console.log("spent " + balance);
        }
    }

    console.log(balance + "final!")
    return balance;
}


function isValid(trans) {

    if (!trans[1]['signature'] || trans[1]['signature'].length == 0) {
        return false;
    }
    const publicKey = ec.keyFromPublic(trans[0]['From'], 'hex');
    return publicKey.verify(calculateHash(trans), trans[1]['signature'])
}
module.exports.SetTransaction = SetTransaction;



