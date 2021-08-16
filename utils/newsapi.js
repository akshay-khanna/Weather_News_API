const NewsAPI = require('newsapi');
let newsapi="";
if(process.env.NEWSAPIKEY!=undefined){
   newsapi = new NewsAPI(process.env.NEWSAPIKEY);
}

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
news_API=(async (search  =undefined)=>{
 let filter ={language:"en"};
 let resp={};
 result = [];
 try{
      if(search===undefined)
      {
        resp= await  newsapi.v2.topHeadlines(filter) ;
      }
      else
      {
        filter.q=search;
        resp= await newsapi.v2.everything(filter);
      }
      let  {articles:dataArr}=resp;
      let data = [];
      dataArr.map((item) => {
      outResp={
        headline:item.title,
        link:item.url
      }
      data.push(outResp);
      });
      
      response={
        count:data.length,
        data
      }
}
catch(e)
{
  response=
  {
    count:0,
    errorMsg:e.message
  }
}
return response;
});

module.exports={
  news_API
}