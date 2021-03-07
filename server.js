const express = require('express');
var app = express();

const blockedtransactions = require('./blockedtransactions.json');
var cors = require('cors')
const getbalance = require('./GetBalance');
const GetKeys = require('./keygenerator');
const pendingTransactions = require('./pendingtransactions.json');
const blocks = require('./storeblock.json');
const SetTransaction = require('./createtransactions');

const mineblock = require('./index');
const GetData = require('./GetPendingTrans');


app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
  

app.use(
    cors());

app.get('/', (res, req, nxt) => {
    // only for adding cors on all requests
    nxt();
});




//Get all the confirmed or blocked transactions
app.get('/transactions',(req,res)=>{

    res.send(blockedtransactions);

});

//Get balance of the any given address
app.post('/getbalance', (req,res)=>{

    var balance = getbalance.getbalance(req.body.address)
    console.log(balance);
    res.send(balance.toString());

});

//Generate public and private keys
app.post('/keygenerator',(req,res)=>{


    let name = req.body.name;
    let keys = GetKeys.GetKeys(name);
    console.log(keys);
    res.send(keys);

});


//Get all the pending transactions
app.get('/pendingtransactions', (req,res)=>{

    res.send(pendingTransactions);

});


//Get all the blocks

app.get('/getblocks',(req,res)=>{

res.send(blocks);

})

//get single blocks

app.get('/getblocks/:height', (req,res)=>{

    for(const b of blocks){
        if(b['index'] == req.params.height){
            res.send(b);
        }
    }
    //res.send(req.params.height);

});


//set transactions

app.post('/createtransaction',async(req,res)=>{


    let from = req.body.from;
    let to = req.body.to;
    let amount = req.body.amount;
    let pk = req.body.privatekey;
    let date = req.body.timestamp;

    console.log(req.body);


    //res.end(await SetTransaction.SetTransaction(from,to,amount,pk));

    res.send(await SetTransaction.SetTransaction(from,to,amount,pk,date));

});
//Get Data

app.get('/getdata',(req,res)=>{
    console.log("pening trans:-"+pendingTransactions);
    res.send(GetData.GetData(pendingTransactions));
    //delete require.cache['server.js'];
});

//mining blocks

app.post('/mineblock',async(req,res)=>{

    let add = req.body.address;
    let hash = req.body.hash;
    let index = req.body.blockindex;
    let nonce = req.body.nonce;
    console.log("The miner address is:",add);

    res.send(await mineblock.MineBlock(add,index,hash,nonce));


});

//server runs on port 5000
app.listen(5000,()=>{

    console.log("Server is running!");
});