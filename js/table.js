function fillTable(){

    let table = document.getElementById("summary-table");


    // add col names in head and footer
    let colNames = ['Place', 'Date', 'Fatalities', 'Injured', 'Age of Shooter', 'Weapons Obtained Legally']
    let keysNames = ['location', 'date', 'fatalities', 'injured', 'age_of_shooter', 'weapons_obtained_legally']

    colNames.forEach(element => {
        var node = document.createElement("th");
        var textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("table-content-head").appendChild(node); 
    });

    colNames.forEach(element => {
        var node = document.createElement("th");
        var textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("table-content-foot").appendChild(node); 
    });

    readTextFile("/data/us_shots.json", function(text){   
        let data =  JSON.parse(text);
        let trNode; let tdNode; let textNode;
        for (let i = 1; i<data.length; i++){
            // row
            trNode = document.createElement("tr");
            trNode.role="row";
            trNode.className="odd";

            // elements in the row
            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].location);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].date);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].fatalities);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].injured);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].age_of_shooter);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            tdNode = document.createElement("td");
            textnode = document.createTextNode(data[i].weapons_obtained_legally);
            tdNode.appendChild(textnode);
            trNode.appendChild(tdNode); 

            document.getElementById("table-content-body").appendChild(trNode); 

        }
    });

}

fillTable()

// document.getElementById("datatables").innerHTML = 
//     "<script src=\"https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js\" crossorigin=\"anonymous\"></script>" +
//     "<script src=\"https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js\" crossorigin=\"anonymous\"></script>" +
//     "<script src=\"assets/demo/datatables-demo.js\"></script>";

