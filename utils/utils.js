/*Utils File For various calculation and computations*/

module.exports={
epochtoDate:(epochTime)=>{
let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
let date = new Date(epochTime*1000); // The 0 there is the key, which sets the date to the epoch
let stringDate=date.toLocaleDateString("en-US", options).replace(/,/g,"");
return stringDate;
}


}
