
function filterByGender(data){
    values_list = [];
    labels = {};
    genders = ['Male', 'Female'];

    genders.forEach(gender => {
        gender_n = 0;
        gender = gender.toLowerCase();
        data.forEach(shot => {
            current_gender = shot.gender.toLowerCase();
            if (current_gender == "m") { current_gender = "male";}
            if (current_gender == "f") { current_gender = "female";}

            if (current_gender == gender){
              gender_n += 1;
            }
        });

        labels[gender_n] = gender;
        values_list.push(gender_n);
    });

    return [genders, values_list];
}


function drawGender(json){
    let filter_json = filterByGender(json);
    let labels = filter_json[0];
    let data = filter_json[1];

    var width = 0.97*window.innerWidth/3;
    var height = 0.8*window.innerHeight/3;

    var gender_card = d3.select("#gender")
      .append("div")
      .attr("id", "gender_card")
      .attr("width", width)
      .attr("height", height)
      .html(
        "<br/>"
        +"<h5>"+labels[0]+"</h4>"
        +"<h4 style='font-weight: bold; color:#717C89'>"+data[0]+" aggressors</h4>"
        +"<br/><br/><h5>"+labels[1]+"</h5>"
        +"<h4 style='font-weight: bold; color:#717C89'>"+data[1]+" aggressors</h44>"
        +"<br/>"
    )


  d3.select("#gender_card")



  
//   svg.append("g")
//           .attr("class", "slices");
//   svg.append("g")
//     .attr("class", "labels");
//   svg.append("g")
//     .attr("class", "lines");
// //   var width = 500;
// //   var height = 400;
//   var radius = Math.min(width, height)/2;
//   var color = d3.scaleOrdinal()
//   .domain(["Male", "Female"])
//   .range(["#D88373", "#F5E2C8"]);;

// //   var color = d3.scale.ordinal()
// //   .domain(["white", "black", "asian", "latino"])
// //   .range(["#A0B2A6", "#493843", "#61988E", "#EABDA8"]);
  
//   var pie = d3.pie().sort(null).value(d => d);
//   var arc = d3.arc().innerRadius(radius*0.8).outerRadius(radius*0.6);
  
//    var outerArc = d3.arc()
//               .outerRadius(radius * 0.9)
//               .innerRadius(radius * 0.9);
   
//   svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
//   svg.selectAll('path')
//   .data(pie(data))
//   .enter()
//   .append('path')
//     .attr('d', arc)
//   .attr('fill', (d,i)=> color(i));
//   svg.append('g').classed('labels',true);
//   svg.append('g').classed('lines',true);
   

//    var polyline = svg.select('.lines')
//               .selectAll('polyline')
//               .data(pie(data))
//             .enter().append('polyline')
//               .attr('points', function(d) {

//                   // see label transform function for explanations of these three lines.
//                   var pos = outerArc.centroid(d);
//                   pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
//                   return [arc.centroid(d), outerArc.centroid(d), pos]
//               });
      
      
  
//      var label = svg.select('.labels').selectAll('text')
//               .data(pie(data))
//             .enter().append('text')
//               .attr('dy', '.35em')
//               .html(function(d) {
//                   return labels[d.data] + ' ('+d.data+')';
//               })
//               .attr('transform', function(d) {
//                   var pos = outerArc.centroid(d);
//                   pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
//                   return 'translate(' + pos + ')';
//               })
//               .style('text-anchor', function(d) {
//                   return (midAngle(d)) < Math.PI ? 'start' : 'end';
//               });
  
//    svg.append('text')
//                       .attr('class', 'toolCircle')
//                       .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
//                       .html('') // add text to the circle.
//                       .style('font-size', '.9em')
//                       .style('text-anchor', 'middle');
  
//   function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; } 

}

function displayGender(){
    // Get the data
    d3.json("../data/us_shots.json", function(error, data) {
      if (error) throw error;
      
      // trigger render
      drawGender(data);
    });
  }