const inputslider=document.querySelector("[lengthslider]");//datalengthslider is a custom attributes
const lengthdisplay=document.querySelector("[lengthnumber]");
const passworddisplay=document.querySelector("[passworddisplay]");
const copymsg=document.querySelector("[copymsg]");
const copybtn=document.querySelector("[copybutton]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const symbolscheck=document.querySelector("#symbols");
const numberscheck=document.querySelector("#numbers");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatebutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*(){}[]-_+"=<>,.?/:;|';

let password="";
let passwordlength=10;
let checkcount=0;
handleslider();
setindicator("#ccc");
function handleslider(){// slider ko bydeafult 10 par set kar diya.
    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
    const min=inputslider.min;
    const max=inputslider.max;
     inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%";
}
function setindicator(color){
    indicator.style.backgroundColor=color;//shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getrndinteger(min,max){ // random hume 0 se 1 tk koi bhi no. de sakta hai including float no. and humne max-min isliya kiya taaki vo 0 se max tk ho jaye and phir +min isliya kiya becoz hume no. min to max tk chaiya.
   return  Math.floor(Math.random()*(max-min))+ min;// math.random hume random no. dega 0-1 tk
}
function generaterandomno(){// to get random number 
    return getrndinteger(0,9);
}
function generatelowercase(){// to convert random number into character.
   return String.fromCharCode(getrndinteger(97,123)); 
}
function generateupppercase(){// to convert random number into character.
    return String.fromCharCode(getrndinteger(65,91)); 
 }
function generatesymbol(){
    const randno=getrndinteger(0,symbols.length);
    return symbols.charAt(randno);
}
function calstrength(){
    let hasuc=false;
    let haslc=false;
    let hasno=false;
    let hassym=false;
if(uppercasecheck.checked) hasuc=true;// agr hume kisi bhi checkbox ko pta karna hai ke ye checked ha ya nhi to.checked se pta karnege vo true ya false mai ans. dega.
if(lowercasecheck.checked) haslc=true;
if(numberscheck.checked) hasno=true;
if(symbolscheck.checked) hassym=true;

if(haslc && hasuc &&(hasno || hassym) &&  passwordlength>=8){
    setindicator("#0f0");
}
else if((haslc || hasuc) && (hasno || hassym) && passwordlength>=6){
    setindicator("#ff0");}
    else{
        setindicator("#f00");
    }
}

 async function copycontent(){
try{
    await navigator.clipboard.writeText(passworddisplay.value);// to copy anything in the input box
    copymsg.innerText="copied";
}
catch(e){
     copymsg.innerText="failed";
}
// to make copy vala span visible
  copymsg.classList.add("active");// agr humne css mai active name ke class banai haito usse ye visible kar dega.
  setTimeout(()=>{
    copymsg.classList.remove("active");
  }, 2000);
}
function handleCheckBoxChange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    });
    //special condition
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}
function shufflePassword(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--){
          const j=Math.floor(Math.random()*(i+1));
  const temp=array[i];
  array[i]=array[j];
  array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)

})
inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;// means jo value inputslider mai ayi hai vo password length mai rakh do.
    handleslider();
})

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value)// means passowrddisplay mai agr kuch likha hai to copy kar paoge varna nhi.
    copycontent();
})
generatebtn.addEventListener('click',()=>{
//none of the checkbox are selected
if(checkcount==0) 
return;
if(passwordlength<checkcount){
    passwordlength=checkcount;
    handleslider();
}
// let start to find new password
//remove old password
password="";
let funarr=[];
if(uppercasecheck.checked)
funarr.push(generateupppercase);
if(lowercasecheck.checked)
funarr.push(generatelowercase);
if(numberscheck.checked)
funarr.push(generaterandomno);
if(symbolscheck.checked)
funarr.push(generatesymbol);
//compulsory addition
 for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();
 }
 //remaining addition
 for(let i=0;i<passwordlength-funarr.length;i++){
    let randomidx=getrndinteger(0,funarr.length);
    password+=funarr[randomidx]();
 }
 //shuffle the password
 password=shufflePassword(Array.from(password));
 passworddisplay.value=password; 
 calstrength();
})