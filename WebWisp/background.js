// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...



chrome.runtime.onInstalled.addListener(function() {
    var myJSON = '{"shopping": ["amazon.com", "jd.com", "ebay.com", "store", "cart", "apple.com", "tmall", "taobao", "ebates", "dealmoon", "lenovo", "macys", "buy", "jcpenny", "bedbathbeyond", "bestbuy", "walmart", "sephora", "newegg", "nordstorm", "bloomingdales", "hm", "target", "marshall", "yami", "ugg", "kate spade", "gilt", "6pm.com", "saks.com", "staples", "gnc", "kiehls.com", "skinstore", "kohls.com", "neimanmarcus", "americanapparel", "ashford", "walgreens", "groupon", "lancome"], "entertainment": ["youba.com", "game", "joyme.com", "18183", "ptbus", "25pp", "dtcq", "yoyou", "duowan", "5253.com", "dota", "lol", "coc", "battle", "iqiyi.com", "youtube.com", "douban", "autohome", "v.qq.com", "eventbrite", "pcbeta", "bilibili", "flickr", "youku", "movie", "letv", "manhua", "bt", "pptv", "tv", "gm99", "tudou", "play", "southpark", "v.sogou.com", "pps", "imdb", "fzdm", "56.com", "piaotian", "qidian", "chuangshi", "uukanshu", "shumilou", "book", "kanshu", "daomengren", "ranwen", "ttzw", "55xs", "yelp", "seamless", "facebook.com", "twitter.com", "weibo", "renren", "weixin", "bbs", "blog", "twitch", "espn", "replays.net", "vk.com", "instragram"], "ee": ["gem5","m5sim.org", "synopsys.com", "edaplayground", "opencore", "asic", "edabroad", "asic-interview", "altera", "xillinx", "cadence", "mentor.com"], "daily": ["mail", "united.com", "delta.com", "studentuniverse.com", "expedia", "cheapair", "hyatt", "marriott", "fedex", "usps", "ups", "dhl", "citi", "chase", "boa", "google.com", "baidu.com", "wikipedia.org", "wiki", "news", "yahoo", "zhihu", "sina", "hertz", "avis", "enterprise", "homeaway", "mta", "twc", "cnn", "gq", "people", "fortune", "tmz", "omg", "lycos", "univision", "aol", "msn", "comcast", "cnn", "ehow", "about", "ask", "blogger", "bing"], "edu": ["file:","127.0","localhost","columbia", "piazza", "printatcu", "edu", "linkedin", "job", "career", "1point3acres", "icims.com", "glassdoor", "hire", "coursehero", "monster", "indeed", "courseworks"], "cs": ["ninechapter.com", "leetcode", "stackoverflow", "ninechapter", "github", "apache", "oracle", "csdn", "cplusplus", "programcreek", "mysql", "geeks", "code", "ubuntu", "stat-computing", "perl", "adobe", "quora.com", "java", "python", "stackexchange", "cloudera","w3schools"]}';
    
    localStorage.WebWisp = myJSON;
    
    var obj = JSON.parse(localStorage.WebWisp);
    //alert(obj.shopping[0]);

    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    var data = {"date":today.getDate(), "daily":0, "edu":0, "entertainment":0, "shopping":0, "cs":0,"ee":0,"other":0,"total":0};
    localStorage.WebWispData = JSON.stringify(data);
/*
    chrome.history.search({
      'text': '',              // Return every history item....
      'startTime': today.getTime(),
      'maxResults': 1000
    },
      function(historyItems) {
      // For each history item, get details on all visits.
      alert(historyItems.length);
        for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;
          var count = historyItems[i].visitCount;
          var match = false;
          //alert(url);
          for(var j=0;j<obj.daily.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.daily[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.daily += count;
              break;
            }
          }
          for(var j=0;j<obj.edu.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.edu[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.edu += count;
              break;
            }
          }
          for(var j=0;j<obj.entertainment.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.entertainment[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.entertainment += count;
              break;
            }
          }
          for(var j=0;j<obj.shopping.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.shopping[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.shopping += count;
              break;
            }
          }
          for(var j=0;j<obj.cs.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.cs[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.cs += count;
              break;
            }
          }
          for(var j=0;j<obj.ee.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.ee[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.ee += count;
              break;
            }
          }
          if(match == false)
          {
            data.other += count;
          }


        }
        alert(data.daily+' '+data.edu+' ' +data.entertainment+' '+data.shopping+' '+data.cs+' '+data.ee+' '+data.other);

    });*/

  
});

chrome.history.onVisited.addListener(function(result){
  //alert(result.url);
  updateLocalData(result);
});

function updateLocalData(historyItem)
{
  var d = new Date();
  var data  = localStorage.WebWispData;
  data = JSON.parse(data);
  if(data.date != d.getDate())
  {
    data = {"date":d.getDate(), "daily":0, "edu":0, "entertainment":0, "shopping":0, "cs":0,"ee":0,"other":0,"total":0};
  }


  var obj = JSON.parse(localStorage.WebWisp);
  var url = historyItem.url;
  var match = false;
  var count = 1;
          //alert(url);
  for(var j=0;j<obj.daily.length && match == false;j++)
  {
            //alert(obj.daily[j]);
    if(url.indexOf(obj.daily[j]) > -1)
    {
              //alert(obj.daily[j]);
              match = true;
              data.daily += count;
              break;
            }
          }
          for(var j=0;j<obj.edu.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.edu[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.edu += count;
              break;
            }
          }
          for(var j=0;j<obj.entertainment.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.entertainment[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.entertainment += count;
              break;
            }
          }
          for(var j=0;j<obj.shopping.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.shopping[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.shopping += count;
              break;
            }
          }
          for(var j=0;j<obj.cs.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.cs[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.cs += count;
              break;
            }
          }
          for(var j=0;j<obj.ee.length && match == false;j++)
          {
            //alert(obj.daily[j]);
            if(url.indexOf(obj.ee[j]) > -1)
            {
              //alert(obj.daily[j]);
              match = true;
              data.ee += count;
              break;
            }
          }
          if(match == false)
          {
            data.other += count;
          }
          data.total += count;
          localStorage.WebWispData = JSON.stringify(data);
          //alert(localStorage.WebWispData);
}

