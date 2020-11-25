function filterByYear(data){
  final_data = [];
  for (let i=1982; i<=2020; i++){
    victims = 0
    data.forEach(shot => {
      if (shot.year === i){
        victims += shot.total_victims;
      }
    });
    final_data.push({'year': d3.timeParse("%Y")(i), 'victims': victims});
  }
  return final_data;
}

function drawVictims(data) {
  
  let shots = filterByYear(data);

  let margin = {top: 30, right: 30, bottom: 50, left: 60},
  width = 460 - margin.left - margin.right,
  height = 1.2*window.innerHeight/3 - margin.top - margin.bottom;

  let svg = d3.select("#evolution_year")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  let x = d3.scaleTime()
  .domain(d3.extent(shots, function(d) {return d.year; }))
  .range([ 0, width ]);
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 15) + ")")
      .style("text-anchor", "middle")
      .text("Year");

// Add Y axis
  let y = d3.scaleLinear()
  .domain([0, d3.max(shots, function(d) { return d.victims; })])
  .range([ height, 0 ]);
  svg.append("g")
  .call(d3.axisLeft(y));

  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Victims");  


  const max = d3.max(shots, function(d) { return +d.victims; })

  svg.append("linearGradient")
  .attr("id", "line-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", 0)
  .attr("y1", y(0))
  .attr("x2", 0)
  .attr("y2", y(max))
  .selectAll("stop")
    .data([
      {offset: "0%", color: "steelblue"},
      {offset: "100%", color: "darkorange"}
    ])
  .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });

// Add the line
svg.append("path")
  .datum(shots)
  .attr("fill", "none")
  .attr("stroke", "url(#line-gradient)" )
  .attr("stroke-width", 2)
  .attr("d", d3.line()
    .x(function(d) { return x(d.year) })
    .y(function(d) { return y(d.victims) })
    )
}

function displayVictims(){

  // Get the data
  d3.json("../data/us_shots.json", function(error, data) {
    if (error) throw error;
    
    // trigger render
    drawVictims(data);
  });
}
