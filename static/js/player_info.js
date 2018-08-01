
function Player1(player_info){

var width = 960,
    height = 600,
    barHeight = height / 2 - 40;

var color = d3.scale.ordinal()
    .range(["#9eb36f", "#cadd9e", "#eee9a6", "#e3bf6b", "#c87572"]);

var tickValues = [4,8,12,16,20];

var svg = d3.select('body').append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  svg.selectAll("*").remove();
      svg.append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill","white");

// x.domain(player_info.map(function(d) { return d.id}));
// y.domain([0, d3.max(data, function(d) { return d.data})]);
//d3.json("static/js/player_info.json", function(error, data) {
  var data = player_info;
  var numBars = player_info.data.length;
  //  console.log(data);
   // console.log(data.data);
  var radius = d3.scale.linear()
      .domain([0,20])
      .range([0, barHeight]);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) {
        console.log(d.count);
        return radius(d.count); })
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

//});
}



$(document).ready(function () {
    $('#player_table').hide();


            // player_table.append(first_row);
});

$(document).on('click',".player",function (e) {
    $target = $(e.target);
    var id = $target.attr('id');
   name_info={player_name:id};
    $.ajax({
        url: '/player_info',
        data: name_info,
        type: 'POST',
        success: function (response) {
            // var table = $("#player_table")
            // row = $('<tr>')
            // for (var x in response) {
            //     var col = $("<td>");
            //     col.text(response[x][0])
            //     row.append(col);
            // }
            // table.append(row);
            // table.show();
            Player1(JSON.parse(JSON.parse(response)));
        },

        error: function (error) {
            console.log(error);
        }
    });
    });


