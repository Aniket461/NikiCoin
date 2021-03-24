
const fs = require('fs');
var data = require('./pendingtransactions.json');
var readline = require('readline');
const { RIPEMD160 } = require('crypto-js');
var rl = readline.createInterface(process.stdin, process.stdout);
const blocksmined = require('./storeblock.json');
const txind = require('./transactionindex.json');

const pen = require('./pendingtransactions.json');



const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');


console.log("Data of pending is:----"+data);

var privateKey ;


    sender = "";
    reciever = "";
    amount = 0;

    var set = {"From":"","To":"","amount":0,"timestamp":"", "blocked":"No"};

    
    var trans = [{"From":"","To":"","amount":0,"timestamp":""},
                {"signature":""},{"index":0},{"confirm":"no"}];


    function SetTransaction(from, to, amount, privateKey, date){

        trans[0].From = from;
        trans[0].To = to;
        trans[0].amount = amount;
        trans[0].timestamp = date;

        console.log(trans);

        const myKey = ec.keyFromPrivate(privateKey);
         let res = signTransaction(trans,myKey);

         return res;
      

    }



    function calculateHash(transaction){

        return SHA256(transaction[0]).toString();
    }

    function signTransaction(transaction,signingKey){

        if(signingKey.getPublic('hex') !== transaction[0]['From']){
            console.log("You cannot sign someone elses wallet")
            return ({"data":"Signing Error"});
        }
        else{

        const hashtx = calculateHash(transaction);
        const sig = signingKey.sign(hashtx,'base64');
        const signature = sig.toDER('hex');
        trans[1].signature = signature;
        
        ind = txind[0].index;
        trans[2].index = ind;

        
    txind[0]['index'] = txind[0]['index'] + 1;
    console.log(txind[0]['index'] + "index here")
    fs.writeFile('./transactionindex.json', JSON.stringify(txind), err => {
        if (err) console.log(err)
        else console.log("index updated");
    });

        //console.log(isValid(transaction));
        //console.log(getBalance(transaction[0]['From']));
        //console.log(transaction[0]['amount']);
       // console.log("Testing "+typeof(getBalance(transaction[0]['From'])) +"---"+ typeof(transaction[0]['amount']));
       // console.log(getBalance(transaction[0]['From']) > transaction[0]['amount']);

        if(getBalance(transaction[0]['From']) >= transaction[0]['amount']){

        
        if(isValid(transaction)){
            


            data.push(transaction);
        fs.writeFile('./pendingtransactions.json',JSON.stringify(data),err =>{
            
        });

        return ({"data":"Complete"});
            
            
            
        }
        else{
            console.log("Transaction is not valid");
            return  ({"data":"Signing Error"});
        }

    }
    else{
        console.log("You do not have enough nikicoins!!!");
        return  ({"data":"No Coins"});
    }
}
    }

    function getBalance(address){
        let balance = 0;
    
        for(const block of blocksmined){
    
            // console.log("=========");
            // console.log(block.transactions);
            // console.log("=========");
    
            for(const tran of block.transactions){
    
               // console.log("here tran "+(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address));
                if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
                    //console.log(JSON.stringify(tran[0]['amount']));
                    balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
                    //console.log("recived "+balance);
                }
    
                if(JSON.stringify(tran[0]['From']).replace('"'," ").replace('"'," ").trim() === address){
                   // console.log(JSON.stringify(tran[0]['amount']));
                    balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
                   // console.log("spent "+balance);
                }
            }
        }

        for(const tran of data){

            // if(JSON.stringify(tran[0]['To']).replace('"'," ").replace('"'," ").trim() === address){
            //     balance = balance +    parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
            //     console.log("recived "+balance);
            // }
    
            if(JSON.stringify(tran[0]['From']).replace('"'," ").replace('"'," ").trim() === address){
                balance = balance - parseFloat(JSON.stringify(tran[0]['amount']).replace('"'," ").replace('"'," ").trim());
                console.log("spent "+balance);
            }
        }
    
        console.log(balance+"final!")
        return balance;
    }
    

    function isValid(trans){

        if(!trans[1]['signature'] || trans[1]['signature'].length == 0 ){
            return false;
        }
        const publicKey = ec.keyFromPublic(trans[0]['From'],'hex');
        return publicKey.verify(calculateHash(trans),trans[1]['signature'])
    }



    function WritetoFile(transaction){
        
    }

    function Start(){
        
        console.log("Welcome to create Transaction screen!");
        console.log("Create your transaction by entering senders & recivers name & amount!");
        sendersname();
    }

    
function recieversname(){     
    rl.question('Enter Reciever Address\n',(answer)=>{

        trans[0].To = answer;
        enteramount();
    
    });
    
}


function sendersname(){        

rl.question('Enter Senders Address\n',(answer)=>{

    trans[0].From = answer;
    recieversname();

});

        // rl.setPrompt('Enter Senders Name\n');
        // rl.prompt();
        // rl.on('line', function(line) {
        //     if (line !== "") {
                

        //         trans.From = line;
        //         this.sender = line;
        //         recieversname();
        //     }
        //     rl.prompt();
        // }).on('close',function(){
        //     process.exit(0);
        // });
}


function enterPrivateKey(){
    rl.question('Enter your private key \n', (answer)=>{

        privateKey = answer;
       // console.log(trans);
        const myKey = ec.keyFromPrivate(privateKey);
        signTransaction(trans,myKey);
        //WritetoFile(trans);
        rl.close();

    });
}

function enteramount(){


    rl.question('Enter  Amount\n',(answer)=>{

        trans[0].amount = answer;
        enterPrivateKey();
       
    
    });
    // rl.setPrompt('Enter Amount\n');
    // rl.prompt();
    // rl.on('line', function(line) {
    //     if (line !== "") {     
    //         trans.amount = line;       
    //         this.amount = line;
    //         console.log(trans);
    //         WritetoFile(trans);
    //         rl.close();
    //     }
    //     rl.prompt();
    // }).on('close',function(){
    //     process.exit(0);
    // });
}

//Start();


module.exports.SetTransaction = SetTransaction;



