const express = require('express');
var app = express();

const blockedtransactions = require('./blockedtransactions.json');
var cors = require('cors')
const getbalance = require('./GetBalance');
const GetKeys = require('./keygenerator');
const pendingTransactions = require('./pendingtransactions.json');
const blocks = require('./storeblock.json');
const SetTransaction = require('./createtransactions');

const mineblock = require('./miningpage');
const GetData = require('./GetPendingTrans');
const difficulty = require('./Difficulty.json');
const pendingapi = require('./pendingtransactions.json');
const lockfile = require('proper-lockfile');
const fs = require('fs');
const User = require('./models/user');
const mongoose = require('mongoose');
const pendingTransactionsSchema = require('./models/pendingtransactions');
const AllTransactions = require('./models/transactions');

const block1 = require('./models/block');
const status = require('./models/status');
const confirmbalance = require('./ConfirmBalance');



var url = "mongodb+srv://Aniket461:Australia20@nikicoin.boz57.mongodb.net/NikiCoin?retryWrites=true&w=majority";

mongoose.connect(url,{useUnifiedTopology:true});
var db = mongoose.connection;
console.log("We are here");

db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{

    console.log("Connected to db");
});



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
    

    AllTransactions.Transaction.find({},(err,data)=>{
        
        transactions = JSON.stringify(data);
        res.send(JSON.parse(transactions));
    })

});

//Get balance of the any given address
app.post('/getbalance', async (req,res)=>{

    console.log(req.body);
    var balance = await getbalance.getbalance(req.body.address)
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
app.get('/pendingtransactions', async (req,res)=>{


    var pending;

    await pendingTransactionsSchema.PendingTransaction.find({},(err,data)=>{

        pending = JSON.stringify(data);
        res.send(JSON.parse(pending));


    });

});


//Get all the blocks

app.get('/getblocks',async (req,res)=>{

    var blocksm = await block1.Block.find({});

res.send(blocksm);

})

//get single blocks

app.get('/getblocks/:height',async (req,res)=>{

var singleb = await block1.Block.find({'index':req.params.height});

            res.send(await singleb);
        
    
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

app.get('/getdata',async (req,res)=>{

    //console.log("pening trans:-"+pendingTransactions);

    pendingTransactionsSchema.PendingTransaction.find({},async (err,data)=>{

        
    res.send(await GetData.GetData(data));

    });

    //delete require.cache['server.js'];
});

//mining blocks

app.post('/mineblock',async(req,res)=>{

    let add = req.body.address;
    let hash = req.body.hash;
    let index = req.body.blockindex;
    let nonce = req.body.nonce;
    let transactions = req.body.transactions;
    console.log("Tran here......."+transactions[0]);

    console.log(res.body);
    console.log("The miner address is:",add);

    res.send(await mineblock.MiningFunction(add,index,hash,nonce,transactions));


});

//confirm pending transaction

app.get('/confirm/:id', async (req,res)=>{

    var done = false;
    
    var id = req.params.id;

    var tx = await pendingTransactionsSchema.PendingTransaction.find({"_id":id});

    var balance = await confirmbalance.confirmbalance(tx[0]['From']);

    console.log("bbbb "+balance);

    var finalb = balance - tx[0]['amount'];
    console.log("fbbff "+finalb);

    if(finalb>0){
        await pendingTransactionsSchema.PendingTransaction.findOneAndUpdate({"_id":id},{$set:{confirm:"yes"}}).then(()=>{
            done = true;
        });
    }
else{
    await pendingTransactionsSchema.PendingTransaction.findOneAndUpdate({"_id":id},{$set:{confirm:"discarded"}}).then(()=>{
        done = true;
    });


}


    if(done){
        
    res.send({"data":"Done"});
    
    }
    else{
        
    res.send({"data":"Failed"});
    }

});

//status 

app.get('/status',async (req,res)=>{

    var newstat = await status.Status.find({});
    res.send(newstat[0]);
    
});

app.post("/status",async (req,res)=>{

    var statusc = req.body.status;
    var time = req.body.timestamp;
    var message = req.body.message;

   var newstat = await status.Status.findOneAndUpdate({'index':1},{$set:{status:statusc,timestamp:time,message:message}});

    res.send({"data":"Done"});
});

app.post('/register',(req,res)=>{

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let publickey = req.body.publickey;

    User.User.find({'email':email},(err,data)=>{

        if(data.length <= 0){console.log("data does not Exist"); console.log(data);
    
        var user = new User.User({

        name:name,
        email:email,
        password:password,
        publickey:publickey

    });

    user.save((err)=>{
        if(err){console.log(err);
        
            res.send({"data":"Failed"});
        }
        else {console.log("User Added")
    
        res.send({"data":"Registration Successful"});

    };
    })

    
    }
        else{console.log(data);
        console.log("data does  exist");
    
        res.send({"data":"Email already Exists!!"});    
    }

    })

    console.log("In Register");

});

//login

app.post('/login',(req,res)=>{

    let email = req.body.email;
    let password = req.body.password;

    User.User.find({'email':email, 'password':password},(err,user)=>{

        if(user.length == 1){

            if(user[0].email == email && user[0].password == password){
                res.send({"data":"User Exist", "user":user[0]});
            }
            else{
                res.send({"data":"No User"});
            }

        }
        else{
            res.send({"data":"No User"});
        }

    });

});


//initial tx

const inn = require('./testing');

app.get('/initial',async (req,res)=>{

    res.send(await inn.Initial());

});


//server runs on port 5000
app.listen( process.env.PORT || 5000,()=>{

    console.log("Server is running!");
});


