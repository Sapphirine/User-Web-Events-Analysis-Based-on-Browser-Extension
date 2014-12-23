
function init()
{
        var rate = 21;
        var lblBike = 'You Beat 21% People';
        
        //var myJSON = '{"shopping": ["amazon.com", "jd.com", "ebay.com", "store", "cart", "apple.com", "tmall", "taobao", "ebates", "dealmoon", "lenovo", "macys", "buy", "jcpenny", "bedbathbeyond", "bestbuy", "walmart", "sephora", "newegg", "nordstorm", "bloomingdales", "hm", "target", "marshall", "yami", "ugg", "kate spade", "gilt", "6pm.com", "saks.com", "staples", "gnc", "kiehls.com", "skinstore", "kohls.com", "neimanmarcus", "americanapparel", "ashford", "walgreens", "groupon", "lancome"], "entertainment": ["youba.com", "game", "joyme.com", "18183", "ptbus", "25pp", "dtcq", "yoyou", "duowan", "5253.com", "dota", "lol", "coc", "battle", "iqiyi.com", "youtube.com", "douban", "autohome", "v.qq.com", "eventbrite", "pcbeta", "bilibili", "flickr", "youku", "movie", "letv", "manhua", "bt", "pptv", "tv", "gm99", "tudou", "play", "southpark", "v.sogou.com", "pps", "imdb", "fzdm", "56.com", "piaotian", "qidian", "chuangshi", "uukanshu", "shumilou", "book", "kanshu", "daomengren", "ranwen", "ttzw", "55xs", "yelp", "seamless", "facebook.com", "twitter.com", "weibo", "renren", "weixin", "bbs", "blog", "twitch", "espn", "replays.net", "vk.com", "instragram"], "ee": ["m5sim.org", "synopsys.com", "edaplayground", "opencore", "asic.co", "edabroad", "asic-interview", "altera", "xillinx", "cadence", "mentor.com"], "daily": ["mail", "united.com", "delta.com", "studentuniverse.com", "expedia", "cheapair", "hyatt", "marriott", "fedex", "usps", "ups", "dhl", "citi", "chase", "boa", "google.com", "baidu.com", "wikipedia.org", "wiki", "news", "yahoo", "zhihu", "sina", "hertz", "avis", "enterprise", "homeaway", "mta", "twc", "cnn", "gq", "people", "fortune", "tmz", "omg", "lycos", "univision", "aol", "msn", "comcast", "cnn", "ehow", "about", "ask", "blogger", "bing"], "edu": ["columbia", "piazza", "printatcu", "edu", "linkedin", "job", "career", "1point3acres", "icims.com", "glassdoor", "hire", "coursehero", "monster", "indeed", "courseworks"], "cs": ["ninechapter.com", "leetcode", "stackoverflow", "ninechapter", "github", "apache", "oracle", "csdn", "cplusplus", "programcreek", "mysql", "geeks", "code", "ubuntu", "stat-computing", "perl", "adobe", "quora.com", "java", "python", "stackexchange", "cloudera"]}';
    //obj = JSON.parse(myJSON);
    //alert(obj.shopping[0]);
        //alert('aaa');

}


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");  

  var data = [{"Category":"CS", "Record":0},{"Category":"EE", "Record":0},{"Category":"Edu", "Record":0},{"Category":"Shop", "Record":0},{"Category":"Entertain", "Record":0},{"Category":"Daily", "Record":0},{"Category":"Others", "Record":0}];
  var rowData = localStorage.WebWispData;
  rowData = JSON.parse(rowData);
  if(rowData.total != 0)
  {
    var remain = 100;
    var x = Math.round((rowData.cs*100)/rowData.total);
    data[0].Record = x;
    remain -= x;
    x = Math.round((rowData.ee*100)/rowData.total);
    data[1].Record = x;
    remain -= x;
    x = Math.round((rowData.edu*100)/rowData.total);
    data[2].Record = x;
    remain -= x;
    x = Math.round((rowData.shopping*100)/rowData.total);
    data[3].Record = x;
    remain -= x;
    x = Math.round((rowData.entertainment*100)/rowData.total);
    data[4].Record = x;
    remain -= x;
    x = Math.round((rowData.daily*100)/rowData.total);
    data[5].Record = x;
    remain -= x;
    data[6].Record = remain;

    //alert(x);
  }
  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Category"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.Category; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Presentage");

  var Category = svg.selectAll(".Category")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.Category) + ",0)"; });

  Category.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

var socre = data[0].Record + data[1].Record + data[2].Record +data[5].Record -data[3].Record -data[4].Record;
socre += 50;
localStorage.WebWispScore = socre;

document.addEventListener('DOMContentLoaded', function() {
//init();
    //d3.csv("data.csv", function(error, data) { alert(data)});
    //alert(socre);
var x = document.getElementById("beat");
var s = localStorage.WebWispScore;
if(s>99)
  s=99;
if(s<1)
  s=1;
x.innerHTML = 'You Beat '+ s +'% People!';
});

