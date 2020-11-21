// function items(obj) {
// 	var i, arr = [];
// 	for(i in obj) {
// 	  arr.push(obj[i]);
// 	}
// 	return arr;
// }

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

function get_state_color(state, shots){
	let color = d3.scaleLinear().range(["rgb(50,190,240)","rgb(50,145,240)","rgb(50,100,240)","rgb(190,47,47)"]);
	color.domain([0,1,2,3]);

	let nb_shots = get_state_shots(state, shots);

	if(!nb_shots){return 'rgb(213,222,217)';}
	else if (nb_shots >= 50){return color(2);}
	else if (nb_shots >= 20){return color(1);}
	else {return color(0);}
}

function display(){

	//Width and height of map
	var width = 1400;
	var height = 700;

	// D3 Projection
	var projection = d3.geoAlbersUsa()
					   .translate([width/2, height/2])    // translate to center of screen
					   .scale([1500]);          // scale things down so see entire US
	        
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
	    .attr("id", "mytooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .text("a simple tooltip");


	d3.json("../data/us-states.json", function(us_states) {
		d3.json('../data/us_shots.json', function(shots){
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
		   .style("stroke", "#fff")
		   .style("stroke-width", "1")

	   		.on('mouseover', function(d, i) {
				d3.select(this).transition()
				.duration('50')
				.attr('fill-opacity', '70%')

				d3.select("#mytooltip")
				.style("opacity", 0);
			})

	   		.on('mouseout', function(d, i) {
				d3.select(this).transition()
				.duration('50')
				.attr('fill-opacity', '100%')
			});

			//Shots dots
			svg.selectAll('path')
			.data(shots)
			.enter()
			.append('circle')
			.attr('fill', 'rgb(217,91,67)')
			.attr('fill-opacity', '70%')
			.attr('r', function(d){return (Math.sqrt(d.total_victims)*4).toString()+'px';})
			.attr("transform", function(d) {
				return "translate(" + projection([d.longitude, d.latitude]) + ")";
			})
			.on('mouseover', function(d, i) {
				d3.select(this).transition()
				.duration('50')
				.attr('fill-opacity', '100%')
	
				d3.select("#mytooltip")
				.style("visibility", "visible")//set style to it
				.html("<h1>"+d.case+"</h1>")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY) + "px")
				.style("opacity", 100)
			})
	
			.on('mouseout', function(d, i) {
				d3.select(this).transition()
				.duration('50')
				.attr('fill-opacity', '70%')
			});
		})
	});
}