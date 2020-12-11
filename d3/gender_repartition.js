
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
        +"<h4 style='font-weight: bold; color:rgba(100, 128, 141, 0.9)'>"+data[0]+" aggressors</h4>"
        +"<br/><br/><h5>"+labels[1]+"</h5>"
        +"<h4 style='font-weight: bold; color:rgba(100, 128, 141, 0.9)'>"+data[1]+" aggressors</h44>"
        +"<br/>"
    )

  d3.select("#gender_card");
}

function displayGender(){
    // Get the data
    d3.json("../data/us_shots.json", function(error, data) {
      if (error) throw error;
      
      // trigger render
      drawGender(data);
    });
  }