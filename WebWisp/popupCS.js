var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 760 - margin.left - margin.right,
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

var svg = d3.select("#p1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = [{"Category":"CS","Yours":"0","Average":"17"},{"Category":"EE","Yours":"0","Average":"0"},{"Category":"Edu","Yours":"0","Average":"10"},{"Category":"Shopping","Yours":"0","Average":"3"},{"Category":"Entertainment","Yours":"0","Average":"48"},{"Category":"Daily","Yours":"0","Average":"18"},{"Category":"Others","Yours":"0","Average":"4"}];

	var rowData = localStorage.WebWispData;
  rowData = JSON.parse(rowData);
  if(rowData.total != 0)
  {
    var remain = 100;
    var x = Math.round((rowData.cs*100)/rowData.total);
    data[0].Yours = x;
    remain -= x;
    x = Math.round((rowData.ee*100)/rowData.total);
    data[1].Yours = x;
    remain -= x;
    x = Math.round((rowData.edu*100)/rowData.total);
    data[2].Yours = x;
    remain -= x;
    x = Math.round((rowData.shopping*100)/rowData.total);
    data[3].Yours = x;
    remain -= x;
    x = Math.round((rowData.entertainment*100)/rowData.total);
    data[4].Yours = x;
    remain -= x;
    x = Math.round((rowData.daily*100)/rowData.total);
    data[5].Yours = x;
    remain -= x;
    data[6].Yours = remain;

    //alert(x);
  }
  //alert(JSON.stringify(data));
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
      .text("Population");

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

//var dist = 8*Math.pow(data[0].Yours - data[0].Average, 2);

//for(var i=0;i<data.length;i++)
{

 // dist += Math.pow(data[i].Yours - data[i].Average, 2);
}

var cs1 = data[0].Yours / (data[0].Yours*1 + data[1].Yours*1);
var ee1 = data[1].Yours / (data[0].Yours*1 + data[1].Yours*1);
var cs2 = data[0].Average / (data[0].Average*1 + data[1].Average*1);
var ee2 = data[1].Average / (data[0].Average*1 + data[1].Average*1);
//alert(cs2);



var dist = Math.pow(cs1-cs2, 2) + Math.pow(ee1-ee2, 2);

dist = Math.sqrt(dist);
dist = dist.toFixed(2);

var title1 = document.getElementById("title1");
title1.innerHTML = 'Your Distance to CS is '+  dist;


document.addEventListener('DOMContentLoaded', function() {
    //var title1 = document.getElementById("title1");
    //title1.inner
});



