 function foo() {

    console.log("Hi");
    x =0 ;
    for(var i =0;i<10000000000;i++){

        x++;

    }

    
    return x; 
  }
  
   async function bar() {
    const result = await foo();
    console.log(result);
  }
  
  bar();
  console.log("lo");