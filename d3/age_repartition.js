function filterByAge(shots){
    final_json = [];

    for (let i=10; i<=70; i += 5){
        age_n = 0;
        shots.forEach(shot => {
            current_age = parseInt(shot.age_of_shooter);
            if (current_age >= i && current_age <= i+5){
                age_n += 1;
            }
        });

        if (age_n >= 0) {final_json.push({'age': i, 'number': age_n});};
    }

    return final_json;
}


function drawAge(json){
    let data = filterByAge(json);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = window.innerWidth/4 - margin.left - margin.right,
    height = window.innerHeight/4 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
    var y = d3.scaleLinear()
            .range([height, 0]);
            
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#age").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.age; }));
    y.domain([0, d3.max(data, function(d) { return d.number; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.age); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.number); })
        .attr("height", function(d) { return height - y(d.number); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(-8," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -25)
        .attr("x", -10)
        //.attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of people");
    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height + 25)
        .text("Age");

}

function displayAge(){
    // Get the data
    d3.json("../data/us_shots.json", function(error, data) {
      if (error) throw error;
      
      // trigger render
      drawAge(data);
    });
  }