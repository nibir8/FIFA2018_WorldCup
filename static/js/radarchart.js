
var width = 960,
    height = 600,
    barHeight = height / 2 - 40;

var color = d3.scale.ordinal()
    .range(["#9eb36f", "#cadd9e", "#eee9a6", "#e3bf6b", "#c87572"]);

var tickValues = [4,8,12,16,20];

var svg = d3.select('body').append("svg")
    .attr("width", width)
    .attr("height", height)
	.attr("viewBox","0,0" +Math.min(width,height)+"" +Math.min(width,height))
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
function Player1(){
  svg.selectAll("*").remove();
      svg.append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill","white");


d3.json("player_info.json", function(error, data) {

  var numBars = data.data.length;

  var radius = d3.scale.linear()
      .domain([0,20])
      .range([0, barHeight]);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) { return radius(d.count); })
    .angle(function(d,i) { return (i * 2 * Math.PI / numBars); });

  var area = d3.svg.area.radial()
    .interpolate(line.interpolate())
    .innerRadius(radius(0))
    .outerRadius(line.radius())
    .angle(line.angle());

  tickValues.sort(function(a,b) { return b - a; });

  var tickPath = svg.selectAll(".tickPath")
      .data(tickValues).enter()
    .append("path")
      .attr("class", "tickPath")
      .attr("d", function(d) { 
        var tickArray = [];
        for (i=0;i<numBars;i++) tickArray.push({count : d});
        return area(tickArray); 
      })
      .style("fill", function(d) { return color(d); })
      .style("stroke", function(d,i) { return (i === 0) ? "black" : "#5e5e5e"; })
      .style("stroke-width", function(d,i) { return (i === 0) ? "1px" : ".5px"; });
  
  var lines = svg.selectAll("line")
      .data(data.data)
    .enter().append("g")
      .attr("class","lines");

  lines.append("line")
    .attr("y2", - barHeight )
    .style("stroke", "#5e5e5e")
    .style("stroke-width",".5px")
    .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  lines.append("text")
    .attr("class", "names")
    .attr("x", function(d, i) { return (barHeight + 15) * Math.sin((i * 2 * Math.PI / numBars)); })
    .attr("y", function(d, i) { return -(barHeight + 15) * Math.cos((i * 2 * Math.PI / numBars)); })
    .attr("text-anchor", function(d,i) { 
    if (i===0 || i===numBars/2) {
        return "middle";
      }else if (i <= numBars/2) {
        return "begin";
      }else {
        return "end";
      }
    })
    .style("font-weight","bold")
    .text(function(d) { return d.skill; });

  layer = svg.selectAll(".layer")
    .data([data]).enter()
    .append("path")
    .attr("class", "layer")
    .attr("d", function(d) { return area(d.data); })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2px");

});
showDiv();
        function showDiv() {
            document.getElementById('pointstable').style.display = "block";
}}
function Player2(){
  svg.selectAll("*").remove();
      svg.append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill","white");


d3.json("https://gist.githubusercontent.com/U-Dayy/1ae247d4f270699a9d3dbcb81b0f18fa/raw/69a73be038afc3e17afd960f4f7d4ccf78d143be/data2.json", function(error, data) {

  var numBars = data.data.length;

  var radius = d3.scale.linear()
      .domain([0,20])
      .range([0, barHeight]);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) { return radius(d.count); })
    .angle(function(d,i) { return (i * 2 * Math.PI / numBars); });

  var area = d3.svg.area.radial()
    .interpolate(line.interpolate())
    .innerRadius(radius(0))
    .outerRadius(line.radius())
    .angle(line.angle());

  tickValues.sort(function(a,b) { return b - a; });

  var tickPath = svg.selectAll(".tickPath")
      .data(tickValues).enter()
    .append("path")
      .attr("class", "tickPath")
      .attr("d", function(d) { 
        var tickArray = [];
        for (i=0;i<numBars;i++) tickArray.push({count : d});
        return area(tickArray); 
      })
      .style("fill", function(d) { return color(d); })
      .style("stroke", function(d,i) { return (i === 0) ? "black" : "#5e5e5e"; })
      .style("stroke-width", function(d,i) { return (i === 0) ? "1px" : ".5px"; });
  
  var lines = svg.selectAll("line")
      .data(data.data)
    .enter().append("g")
      .attr("class","lines");

  lines.append("line")
    .attr("y2", - barHeight )
    .style("stroke", "#5e5e5e")
    .style("stroke-width",".5px")
    .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  lines.append("text")
    .attr("class", "names")
    .attr("x", function(d, i) { return (barHeight + 15) * Math.sin((i * 2 * Math.PI / numBars)); })
    .attr("y", function(d, i) { return -(barHeight + 15) * Math.cos((i * 2 * Math.PI / numBars)); })
    .attr("text-anchor", function(d,i) { 
    if (i===0 || i===numBars/2) {
        return "middle";
      }else if (i <= numBars/2) {
        return "begin";
      }else {
        return "end";
      }
    })
    .style("font-weight","bold")
    .text(function(d) { return d.skill; });

  layer = svg.selectAll(".layer")
    .data([data]).enter()
    .append("path")
    .attr("class", "layer")
    .attr("d", function(d) { return area(d.data); })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2px");

});
showDiv();
        function showDiv() {
            document.getElementById('pointstable').style.display = "block";
}}
function Player3(){
  svg.selectAll("*").remove();
      svg.append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill","white");


d3.json("https://gist.githubusercontent.com/U-Dayy/fce2e49ded7b6d1f2c16fb1ef1c9fd16/raw/23b7d0c0908db9077d8bb7f0d153348abd203705/data3.json", function(error, data) {

  var numBars = data.data.length;

  var radius = d3.scale.linear()
      .domain([0,20])
      .range([0, barHeight]);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) { return radius(d.count); })
    .angle(function(d,i) { return (i * 2 * Math.PI / numBars); });

  var area = d3.svg.area.radial()
    .interpolate(line.interpolate())
    .innerRadius(radius(0))
    .outerRadius(line.radius())
    .angle(line.angle());

  tickValues.sort(function(a,b) { return b - a; });

  var tickPath = svg.selectAll(".tickPath")
      .data(tickValues).enter()
    .append("path")
      .attr("class", "tickPath")
      .attr("d", function(d) { 
        var tickArray = [];
        for (i=0;i<numBars;i++) tickArray.push({count : d});
        return area(tickArray); 
      })
      .style("fill", function(d) { return color(d); })
      .style("stroke", function(d,i) { return (i === 0) ? "black" : "#5e5e5e"; })
      .style("stroke-width", function(d,i) { return (i === 0) ? "1px" : ".5px"; });
  
  var lines = svg.selectAll("line")
      .data(data.data)
    .enter().append("g")
      .attr("class","lines");

  lines.append("line")
    .attr("y2", - barHeight )
    .style("stroke", "#5e5e5e")
    .style("stroke-width",".5px")
    .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  lines.append("text")
    .attr("class", "names")
    .attr("x", function(d, i) { return (barHeight + 15) * Math.sin((i * 2 * Math.PI / numBars)); })
    .attr("y", function(d, i) { return -(barHeight + 15) * Math.cos((i * 2 * Math.PI / numBars)); })
    .attr("text-anchor", function(d,i) { 
    if (i===0 || i===numBars/2) {
        return "middle";
      }else if (i <= numBars/2) {
        return "begin";
      }else {
        return "end";
      }
    })
    .style("font-weight","bold")
    .text(function(d) { return d.skill; });

  layer = svg.selectAll(".layer")
    .data([data]).enter()
    .append("path")
    .attr("class", "layer")
    .attr("d", function(d) { return area(d.data); })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2px");

});
showDiv();
        function showDiv() {
            document.getElementById('pointstable').style.display = "block";
}}
function Player4(){
  svg.selectAll("*").remove();
      svg.append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill","white");


d3.json("https://gist.githubusercontent.com/U-Dayy/6e0927908cdd16a8ac459cb77a2ab2c9/raw/631e7901b80631e92280ed9a4a6a9616dea44ac9/data4.json", function(error, data) {

  var numBars = data.data.length;

  var radius = d3.scale.linear()
      .domain([0,20])
      .range([0, barHeight]);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) { return radius(d.count); })
    .angle(function(d,i) { return (i * 2 * Math.PI / numBars); });

  var area = d3.svg.area.radial()
    .interpolate(line.interpolate())
    .innerRadius(radius(0))
    .outerRadius(line.radius())
    .angle(line.angle());

  tickValues.sort(function(a,b) { return b - a; });

  var tickPath = svg.selectAll(".tickPath")
      .data(tickValues).enter()
    .append("path")
      .attr("class", "tickPath")
      .attr("d", function(d) { 
        var tickArray = [];
        for (i=0;i<numBars;i++) tickArray.push({count : d});
        return area(tickArray); 
      })
      .style("fill", function(d) { return color(d); })
      .style("stroke", function(d,i) { return (i === 0) ? "black" : "#5e5e5e"; })
      .style("stroke-width", function(d,i) { return (i === 0) ? "1px" : ".5px"; });
  
  var lines = svg.selectAll("line")
      .data(data.data)
    .enter().append("g")
      .attr("class","lines");

  lines.append("line")
    .attr("y2", - barHeight )
    .style("stroke", "#5e5e5e")
    .style("stroke-width",".5px")
    .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  lines.append("text")
    .attr("class", "names")
    .attr("x", function(d, i) { return (barHeight + 15) * Math.sin((i * 2 * Math.PI / numBars)); })
    .attr("y", function(d, i) { return -(barHeight + 15) * Math.cos((i * 2 * Math.PI / numBars)); })
    .attr("text-anchor", function(d,i) { 
    if (i===0 || i===numBars/2) {
        return "middle";
      }else if (i <= numBars/2) {
        return "begin";
      }else {
        return "end";
      }
    })
    .style("font-weight","bold")
    .text(function(d) { return d.skill; });

  layer = svg.selectAll(".layer")
    .data([data]).enter()
    .append("path")
    .attr("class", "layer")
    .attr("d", function(d) { return area(d.data); })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2px");

});
showDiv();
        function showDiv() {
            document.getElementById('pointstable').style.display = "block";
}}
