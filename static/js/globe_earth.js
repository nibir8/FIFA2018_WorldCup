
var width = 800,
  height = 600,
  sens = 0.25,focused;

  //Setting projection

  var projection = d3.geoOrthographic ()
  .scale(245)
  .rotate([0, 0])
  .translate([width / 2.5, height / 2])
  .clipAngle(90);

  var path = d3.geoPath()
  .projection(projection);

  //SVG container

  var svg = d3.select("body").append("svg")
  .attr("width", '50%')
  .attr("height", '80%')
  .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr("transform", "translate(" + Math.min(width,height) /1000 + "," + Math.min(width,height) /500 + ")");

  //Adding water

  svg.append("path")
  .datum({type: "Sphere"})
  .attr("class", "water")
  .attr("d", path);

  var countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip"),
  countryList = d3.select("body").append("select").attr("name", "countries");
  d3.select("select").attr("id","country_list");


  queue()
  .defer(d3.json, "https://gist.githubusercontent.com/U-Dayy/3265260a932a3520cc71159e81307222/raw/1eede92d30ab1e2c759d6345cfd859f4ad5dd463/world-110m.json")
  .defer(d3.tsv, "https://gist.githubusercontent.com/U-Dayy/4b17a737eccd4a5d1d885f4c40cd4a62/raw/b115a247e786478e58b16362cc470d647bd911a4/world-110m-country-names.tsv")
  .await(ready);

  //Main function

  function ready(error, world, countryData) {

    var countryById = {},
    countries = topojson.feature(world, world.objects.countries).features;

    //Adding countries to select

    countryData.forEach(function(d) {
      countryById[d.id] = d.name;
      option = countryList.append("option");
      option.text(d.name);
      option.property("value", d.id);
    });

    //Drawing countries on the globe

    var world = svg.selectAll("path.land")
    .data(countries)
    .enter().append("path")
    .attr("class", "land")
    .attr("d", path)

    //Drag event

    .call(d3.drag()
      .subject(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
      .on("drag", function() {
        var rotate = projection.rotate();
        projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
        svg.selectAll("path.land").attr("d", path);
        svg.selectAll(".focused").classed("focused", focused = false);
      }));

    //Country focus on option select

    d3.select("select").on("change", function() {
	  //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
      var rotate = projection.rotate(),
      focusedCountry = country(countries, this),
      p = d3.geoCentroid(focusedCountry);

      svg.selectAll(".focused").classed("focused", focused = false);
      showDiv();

    //Globe rotating

    (function transition() {
      d3.transition()
      .duration(500)
      .tween("rotate", function() {
        var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
        return function(t) {
          projection.rotate(r(t));
          svg.selectAll("path").attr("d", path)
          .classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
        };
      })
      })();
    });

    function country(cnt, sel) {
      for(var i = 0, l = cnt.length; i < l; i++) {
        if(cnt[i].id == sel.value) {return cnt[i];}
      }
    };
    function showDiv() {
      document.getElementById('pointstable').style.display = "block";
    };

  };
  