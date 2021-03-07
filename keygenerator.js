const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');
const keypair = require('./keypair.json');
const key = ec.genKeyPair();
const fs = require('fs');

var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);




var signature;

var name;

function getName(){

rl.question('Enter your Full Name\n',(answer)=>{

    name = answer;
    GenKeyP();

});
}

function GenKeyP(name){


//console.log(key);
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

var tr = {"name":name,"publickey":publicKey,"privatekey":privateKey}

keypair.push(tr);

fs.writeFile('./keypair.json',JSON.stringify(keypair),err =>{
    if(err) console.log(err)
    else console.log("Key Pair is Generated please write it down and never disclose it!")
});

return tr;

console.log("private key:", privateKey);
console.log("public key:", publicKey);

//rl.close();

}

module.exports.GetKeys = GenKeyP;

//getName();
//rl.close();

// const key1 = ec.genKeyPair();

// //console.log(key1);

// const publicKey1 = key1.getPublic('hex');
// const privateKey1 = key1.getPrivate('hex');

// console.log("private key1:", privateKey1);
// console.log("public key1:", publicKey1);


// function calculateHash(name){
//     return SHA256(name).toString();
// }

//     const hashtx = calculateHash("Aniket");
// console.log("hash is here"+hashtx)
//     var sig = key.sign(hashtx,'base64');
//     //console.log(sig);
//      signature= sig.toDER('hex');
//     console.log(signature);


// function IsValid(){
//     const pub = ec.keyFromPublic(publicKey1, 'hex');
//     // console.log("Pub is here:", pub.publicKey);
//     // console.log("private"+privateKey);
//     console.log(pub.verify(calculateHash("Aniket"), signature));
// }


// IsValid();
