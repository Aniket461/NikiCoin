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
const difficulty = require('./Difficulty.json');
const pendingapi = require('./pendingtransactions.json');
const lockfile = require('proper-lockfile');
const fs = require('fs');

const User = require('./models/user');

const mongoose = require('mongoose');

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

    res.send(blockedtransactions);

});

//Get balance of the any given address
app.post('/getbalance', (req,res)=>{

    console.log(req.body);
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
    let transactions = req.body.transactions;
    console.log("Tran here......."+transactions[0]);

    console.log(res.body);
    console.log("The miner address is:",add);

    res.send(await mineblock.MineBlock(add,index,hash,nonce,transactions));


});

//confirm pending transaction

app.get('/confirm/:id', (req,res)=>{

    var done = false;
    pendingapi.forEach(element => {
        
        if(element[2].index == req.params.id){
            element[3].confirm = 'yes';
            done = true;
            
        }

    });

    if(done){
        
    res.send({"data":"Done"});
    lockfile.lock('./pendingtransactions.json').then(()=>{

            
        fs.writeFile('./pendingtransactions.json', JSON.stringify(pendingapi), err => {
            if (err) console.log(err);
    
            console.log("Changed!");
        });
        return lockfile.unlock('./pendingtransactions.json');
    
    
            });
    
    }
    else{
        
    res.send({"data":"Failed"});
    }

});

//status 

app.get('/status',(req,res)=>{

    
    var statusfile = require('./status.json');

    res.send(statusfile[0]);

});

app.post("/status",(req,res)=>{

    var status = req.body.status;
    var time = req.body.timestamp;
    var message = req.body.message;

    var statusfile = require('./status.json');

    statusfile[0].status = status;
    statusfile[0].timestamp = time;
    statusfile[0].message = message;

    fs.writeFile('./status.json', JSON.stringify(statusfile),(err)=>{

        if(err){console.log(err)}
        else{console.log("Done Status Check")}

    });

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



//server runs on port 5000
app.listen(5000,()=>{

    console.log("Server is running!");
});