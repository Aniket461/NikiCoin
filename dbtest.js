const mongodb = require('mongodb').MongoClient;
const mongoose = require('mongoose');
let dbi;


var url = "mongodb+srv://Aniket461:Australia20@nikicoin.boz57.mongodb.net/NikiFirst?retryWrites=true&w=majority";

mongoose.connect(url,{useUnifiedTopology:true});
var db = mongoose.connection;
console.log("We are here");

db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{

    console.log("Connected to db");
});

const subject = db.collection('School');
const u = {"name":"Mother Marys","year":1998};
// subject.insertOne(u).then(()=>{

//     console.log("inserted");
// });

const SubjectSchema = new mongoose.Schema({

    subject:String,
    marks:Number,
});


var subjectmodel = mongoose.model('subjectmodel',SubjectSchema);


// var sub = new subjectmodel({

//     subject:"Test1",
//     marks: 12

// });

// sub.save((err)=>{
//     if(err) console.log(err)
//     else{console.log("User inserted")}
// })

subjectmodel.find({},(err,data)=>{
    console.log(data);
})


// usermodel.find({},(err,data)=>{
//     console.log(data);
// })



// console.log(db.collection('School').find((err,data)=>{

//     console.log(data);

// }));



//  mongodb.connect(url,{useUnifiedTopology:true},(err,client)=>{



//     if(err){console.log(err)}
//     else{console.log("connected to db")
//     dbi = client;
// //     const db = client.db('Test');
    
// //  const user = db.collection('User');

// // const u = {"name":"Aniket","roll":12};

// // user.insertOne(u).then(()=>{
// //     console.log("User inserted");
// // });

// }
// });

// let db = mongodb.con

// const subject = dbi.collection('Subject');
// const u = {"subject":"History","marks":12};
// subject.insertOne(u).then(()=>{
//     console.log("Subject inserted");
// });


const block = {
    "index": 10,
    "transactions": [
        [
            {
                "From": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
                "To": "04d27bb8c0bcaeb359ece89fc95cccc82fb79ab3ab4255f6f10c4d583a8af07fa802fddb38c0c0124331852f7ec69afab3bd00206b1358ea7d27343e20fca1a059",
                "amount": "33",
                "timestamp": 1616148003354
            },
            {
                "signature": "3045022036250184f91333c1860977d53476dc5f92568c86b65ad5e6d5ea0a7bac477e460221009576615396343a562a20636ad771b652f79b4df323d99d84798a62c89d6a7b41"
            },
            {
                "index": 41
            },
            {
                "confirm": "yes"
            }
        ],
        [
            {
                "From": "System",
                "To": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
                "amount": 100,
                "timestamp": 1616250588546
            },
            {
                "signature": "null"
            },
            {
                "index": 42
            },
            {
                "confirm": "yes"
            }
        ],
        [
            {
                "From": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
                "To": "04d27bb8c0bcaeb359ece89fc95cccc82fb79ab3ab4255f6f10c4d583a8af07fa802fddb38c0c0124331852f7ec69afab3bd00206b1358ea7d27343e20fca1a059",
                "amount": "13",
                "timestamp": 1616312915188
            },
            {
                "signature": "3045022036250184f91333c1860977d53476dc5f92568c86b65ad5e6d5ea0a7bac477e460221009576615396343a562a20636ad771b652f79b4df323d99d84798a62c89d6a7b41"
            },
            {
                "index": 43
            },
            {
                "confirm": "yes"
            }
        ],
        [
            {
                "From": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
                "To": "04d27bb8c0bcaeb359ece89fc95cccc82fb79ab3ab4255f6f10c4d583a8af07fa802fddb38c0c0124331852f7ec69afab3bd00206b1358ea7d27343e20fca1a059",
                "amount": "2.5",
                "timestamp": 1616414638348
            },
            {
                "signature": "3045022036250184f91333c1860977d53476dc5f92568c86b65ad5e6d5ea0a7bac477e460221009576615396343a562a20636ad771b652f79b4df323d99d84798a62c89d6a7b41"
            },
            {
                "index": 44
            },
            {
                "confirm": "yes"
            }
        ]
    ],
    "previoushash": "000f3435312c358b2f0d26b52df9a01d6f18f5ee93786954bdeef4f9d9b1ae48",
    "hash": "00000222a6678b462c2f162dd32106a93cd6d3ae7e9bbdcb796a054e70aefb38",
    "nonce": 2090162,
    "merkleroot": "03E3820969A5CA0DAFD4AB17F41A828CADCDE518EC4B4D170E364A566C7A762C",
    "timestamp": 1616425039860
}

const blockSchema =new mongoose.Schema({

    index:String,
    transactions:[],
    previoushash:String,
    hash:String,
    nonce:Number,
    merkleroot:String,
    timestamp:Number

});

var Block = mongoose.model('Block',blockSchema);

// var block1 = new Block({

//     index:block.index,
//     transactions : block.transactions,
//     previoushash:block.previoushash,
//     hash:block.hash,
//     nonce: block.nonce,
//     merkleroot:block.merkleroot,
//     timestamp:block.timestamp

// });

// block1.save((err)=>{
//     if(err)console.log(err);
//     else console.log("Block added");
// });

Block.find({},(err,data)=>{
    console.log(data[0].transactions[0]);
});


var tran = [
    {
        "From": "System",
        "To": "04217e344706bada084197bdbf5bce08ad0a0c8ef7c6ea7ffcd26ad85a37c34ab782b435711cf5ff12a28dd230cc97839fcae0e10cdd2f800bead748dd650684e2",
        "amount": 100,
        "timestamp": 1616425039860
    },
    {
        "signature": "null"
    },
    {
        "index": 46
    },
    {
        "confirm": "yes"
    }
]

const Transaction = require('./models/transactions');

// var tx = new Transaction.Transaction({
//     From: tran[0].From,
//     To:tran[0].To,
//     amount:tran[0].amount,
//     timestamp: tran[0].timestamp,
//     signature:tran[1].signature,
//     index:tran[2].index,
//     confirm:"yes"
// });

// tx.save((err)=>{
//     if(err)console.log(err);
//     else console.log("transaction added");
// })


const indexes = require('./models/indexes');

// var indexadd = indexes.IndexModel({
//     name:"TransactionIndex",
//     index:1

// });

// indexadd.save((err)=>{
//     if(err)console.log(err);
//     else{console.log("Index Added")}
// });

var d = 0;

indexes.IndexModel.find({'name':"TransactionIndex"},(err,data)=>{

    console.log(data[0]['index']);
    d = data[0]['index'];
    
console.log(d+1);
indexes.IndexModel.findOneAndUpdate({'name':"TransactionIndex"}, {$set:{
    index:d+1
 }}).then(()=>{
     console.log("Updated");
 }).catch((e)=>{
     console.log(e);
 });

});

