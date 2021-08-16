const axios = require('axios');
const url = require('url');
const {epochtoDate}=require('./utils');
const API_KEY=process.env.WEATHERAPIKEY
//console.log(API_KEY)
weatherAPI=async()=> {
    let response={};

    let payload = {
      q: process.env.WEATHERAPILOC,
      appid: process.env.WEATHERAPIKEY,
      units:process.env.WEATHERUNIT };

    const params = new url.URLSearchParams(payload);
    try {
        let resp = await axios.get(`${process.env.WEATHERAPIENDPOINT}?${params}`);
        
        const result=(resp.data);
        //console.log(result);
        let {cnt:count,city,list}=result;
        let data = [];
        let location=city.name;
        list.filter((item,index,arr) => {
        if(index%8==0)   
        {
          outResp=
          {
              date:epochtoDate(item.dt),
              main:item.weather[0].main,
              temp:item.main.temp
          } 
          data.push(outResp);
        }
        });
        //console.log(data)
        response=
        {
          count:data.length,
          unit:payload.units,
          location,
          data
        }
        
    } 
    catch (err) {
      response={
        count:0, 
        errorMsg:err.message
      }
    }
    return response;
  }
module.exports={
  weatherAPI
}