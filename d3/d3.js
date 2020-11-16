function display(){

	//Width and height of map
	var width = 1400;
	var height = 700;

	// D3 Projection
	var projection = d3.geo.albersUsa()
					   .translate([width/2, height/2])    // translate to center of screen
					   .scale([1500]);          // scale things down so see entire US
	        
	// Define path generator
	var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
			  	 .projection(projection)

	  // tell path generator to use albersUsa projection


	//Create SVG element and append map to the SVG
	var svg = d3.select("#d3_map")
				.append("svg")
				.attr("width", width)
				.attr("height", height);
	        
	// Append Div for tooltip to SVG
	var tooltip = d3.select("#d3_map")
	    .append("div")
	    .attr("id", "mytooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .text("a simple tooltip");

	d3.json("../data/us-states.json", function(json) {
	    //Bind data and create one path per GeoJSON feature
	    svg.selectAll("path")
	       .data(json.features)
	       .enter()
	       .append("path")
	       .attr("d", path)
	       .style("fill", "steelblue")
	       .attr('fill-opacity', '100%')
	       .attr("width", width)
	       .attr("height", height)

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
			})
			;

	});

	// Load GeoJSON data and merge with states data
	d3.json("http://localhost:5000", function(json) {
		svg.selectAll('path')
		.data(json)
		.enter()
		.append('circle')
		.attr('r', '8px')
		.attr('fill', 'orange')
		.attr('fill-opacity', '70%')
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

	});
}