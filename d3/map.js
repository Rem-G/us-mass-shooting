function get_state_stats(state, shots){
	let fatalities = 0;
	let injured = 0;
	shots.forEach(shot => {
		current_state = shot.location.split(', ')[1];
		if (current_state === state){
			fatalities += shot.fatalities;
			injured += shot.injured;
		}
	});

	return {'fatalities': fatalities, 'injured': injured};
}

function get_state_shots(state, shots){
	let shots_nb = null;

	shots.forEach(shot => {
		current_state = shot.location.split(', ')[1];
		if (current_state === 'Lousiana'){current_state = 'Louisiana';}

		if (current_state === state ){
			if (!shots_nb){shots_nb = 0;}
			shots_nb += shot.total_victims;
		}
	});
	return shots_nb;
}

let color = d3.scaleLinear().range(["#bbd1e3", "#89afcf", "steelblue", "rgba(217,91,67,70)"]);
color.domain([0, 1, 2, 3]);

function get_state_color(state, shots){
	let nb_shots = get_state_shots(state, shots);

	if(!nb_shots){return 'rgb(213,222,217)';}
	else if (nb_shots >= 50){return color(2);}
	else if (nb_shots >= 20){return color(1);}
	else {return color(0);}
}

function display_map(){

	console.log('Display map ok');

	//Width and height of map
	var width = 500;
	var height = 500;
	var scale = 750;

	// D3 Projection
	var projection = d3.geoAlbersUsa()
					   .translate([width/2, height/2])    // translate to center of screen
					   .scale([scale]);          // scale things down so see entire US
	        
	// Define path generator
	var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
			  	 .projection(projection)

	  // tell path generator to use albersUsa projection


	//Create SVG element and append map to the SVG
	var svg = d3.select("#d3_map")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				// .call(d3.zoom().on("zoom", function () {
       			// 	svg.attr("transform", d3.event.transform)
    			// }));
	        
	// Append Div for tooltip to SVG
	var tooltip = d3.select("#d3_map")
	    .append("div")
	    .attr("id", "tooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden");
		

	const legendText = ["< 20 victims", "> 20 victims", "> 50 victims", "shootings"];

	let legend = d3.select("#d3_map").append("svg")
      			.attr("class", "legend")
     			.attr("width", 140)
    			.attr("height", 200)
   				.selectAll("g")
   					.data(color.domain().slice().reverse())
   				.enter()
   				.append("g")
     			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color)

	legend.append("text")
		.style("font-color", "black")
		.attr("x", 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.text(function(d){return legendText[d];});


	d3.json('../data/us_shots.json', function(shots){
		d3.json("../data/us-states.json", function(us_states) {

	    //Bind data and create one path per GeoJSON feature
	    svg.selectAll("path")
	       .data(us_states.features)
	       .enter()
	       .append("path")
	       .attr("d", path)
	       .style("fill", function(state){return get_state_color(state.properties.name, shots)})
	       .attr('fill-opacity', '100%')
	       .attr("width", width)
		   .attr("height", height)
		   .attr("state", function(state){return state.properties.name;})
		   .style("stroke", "#fff")
		   .style("stroke-width", "1")

		//    .on('mouseover', function(d) {
		// 	   console.log(d);
		//    d3.select("#tooltip")
		// 	   .style("visibility", "visible")//set style to it
		// 	   .html(function(){
		// 		   const stats = get_state_stats(d.location.split(', ')[1], shots);
		// 		   console.log(stats);
		// 		   return "<h3>"+d.location.split(', ')[1]+"</h3>"
		// 				   +"<p>"+stats.fatalities+" have been killed, "+stats.injured+" injured.</p>";
		// 	   })
		// 	   .style("left", (d3.event.pageX) + "px")
		// 	   .style("top", (d3.event.pageY) + "px")
		// 	})
			;

			//Shots dots
			svg.selectAll('circle')
			.data(shots)
			.enter()
			.append('circle')
			.attr('fill', 'rgb(217,91,67)')
			.attr('fill-opacity', '70%')
			.attr('r', function(d){return (Math.sqrt(d.total_victims)*4*(scale/1000)).toString()+'px';})
			.attr("transform", function(d) {
				return "translate(" + projection([d.longitude, d.latitude]) + ")";
			})
			.on('mouseover', function(d, i) {
				d3.select(this).transition()
				.duration('50')
				.attr('fill-opacity', '100%')
	
				d3.select("#tooltip")
					.style("visibility", "visible")//set style to it
					.html(
						"<h3>"+d.case+"</h3>"
						+"<h4>"+d.date+", "+d.location+"</h4>"
						+"<p>"+d.summary+"</p>"
						+"<p>"+d.fatalities+" people have been killed, "+d.injured+" injured.</p>"
					)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px")
			})
	
			.on('mouseout', function(d, i) {
				d3.select(this).transition()
					.duration('50')
					.attr('fill-opacity', '70%');

				d3.select("#tooltip")
					.style("visibility", "hidden");
			});
		});
	});
}