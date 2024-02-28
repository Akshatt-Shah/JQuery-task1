
function showdata() {


    // document.addEventListener("DOMContentLoaded", function () {
    // Retrieve data from localStorage
    var data = localStorage.getItem("users");
    let tableHeader = document.querySelector("#table thead");

    // Check if data exists
    if (data) {

        data = JSON.parse(data); // Parse the data if it's in JSON format

        console.log(data);
        // Get the table body element
        let tableBody = document.querySelector("#table #data-body");
        for (var key in data) {
            console.log(key);
        }


        var tbody = document.getElementById('data-body');

        data.forEach(function (entry) {
            var row = document.createElement("tr");

            // Iterate over each property in the entry
            Object.keys(entry).forEach(function (key) {
                if (key !== "educationfields") {
                    var cell = document.createElement("td");
                    cell.textContent = entry[key];
                    row.appendChild(cell);
                }
            });

            // Iterate over each education field
            // entry.educationfields.forEach(function(field) {
            //     Object.keys(field).forEach(function(key) {
            //         var cell = document.createElement("td");
            //         cell.textContent = field[key];
            //         row.appendChild(cell);
            //     });
            // });

            tableBody.appendChild(row);

            // Append the row to the table body to add delete button
            let cell = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", function () {
                // Remove the row when the delete button is clicked
                row.remove();
                let row_id = deleteButton.parentNode.parentNode.rowIndex - 1;
                console.log(row_id);
                data.splice(row_id, 1);
                // Update the localStorage with the updated data
                localStorage.setItem("users", JSON.stringify(data));



                alert("record deleted from storage");
                row.remove();

                alert("record deleted");
                // Here you can add logic to also remove the corresponding data from your data array and update localStorage
            });
            cell.appendChild(deleteButton);
            row.appendChild(cell);

            // Append the row to the table body to add Update button
            cell = document.createElement("td");
            let updateeButton = document.createElement("button");
            updateeButton.textContent = "Update";
            updateeButton.className = "btn btn-warning";
            updateeButton.setAttribute("data-bs-toggle", "modal");
            updateeButton.setAttribute("data-bs-target", "#exampleModal");
            updateeButton.setAttribute("data-bs-dismiss", "modal");

            updateeButton.addEventListener("click", function () {

                let row_id = updateeButton.parentNode.parentNode.rowIndex - 1;
                let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                sessionStorage.setItem("userid", row_id);
                update(row_id);
                // modal.show();

                //window.location = '/index.html?userid=' + row_id;

            });
            cell.appendChild(updateeButton);
            row.appendChild(cell);





            tableBody.appendChild(row);
        });

        // Loop through the data and create table rows
        // data.forEach(function (rowData, index) {

        // let studenData = data[index][0];

        // console.log(studenData);

        // let row = document.createElement("tr");
        // for (const key in studenData) {
        //     let cell = document.createElement("td");
        //     if (key == "educationfields") {
        //         studenData[key].forEach(function (rowData, index) {
        //             let educatinData = studenData[key][index];
        //             // console.log(educatinData);
        //             for (const keyA in educatinData) {
        //                 //console.log(educatinData[keyA]);
        //                 let cell = document.createElement("td");
        //                 cell.textContent = educatinData[keyA];
        //                 row.appendChild(cell);
        //             }
        //         });
        //         continue
        //     }
        //     cell.textContent = studenData[key];
        //     row.appendChild(cell);
        // }


        // studenData = data[index][1];
        // console.log(studenData);

        // for (const key in studenData) {
        //     let cell = document.createElement("td");
        //     cell.textContent = studenData[key];
        //     row.appendChild(cell);
        // }

        // studenData = data[index][2];
        // console.log(studenData);

        // for (const key in studenData) {
        //     let cell = document.createElement("td");
        //     cell.textContent = studenData[key];
        //     row.appendChild(cell);
        // }
        // Loop through the rowData and create table cells
        // rowData.forEach(function (cellData) {
        //     let cell = document.createElement("td");
        //     cell.textContent = cellData;
        //     row.appendChild(cell);

        // });

        // Append the row to the table body to add delete button
        // let cell = document.createElement("td");
        // let deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
        // deleteButton.className = "btn btn-danger";
        // deleteButton.addEventListener("click", function () {
        // Remove the row when the delete button is clicked
        //row.remove();
        // let row_id = deleteButton.parentNode.parentNode.rowIndex - 1;
        // console.log(row_id);
        // data.splice(row_id, 1);
        // Update the localStorage with the updated data
        // localStorage.setItem("users", JSON.stringify(data));



        // alert("record deleted from storage");
        // row.remove();

        //alert("record deleted");
        // Here you can add logic to also remove the corresponding data from your data array and update localStorage
        // });
        // cell.appendChild(deleteButton);
        // row.appendChild(cell);


        // Append the row to the table body to add Update button
        // cell = document.createElement("td");
        // let updateeButton = document.createElement("button");
        // updateeButton.textContent = "Update";
        // updateeButton.className = "btn btn-warning";
        // updateeButton.addEventListener("click", function () {
        //     let row_id = updateeButton.parentNode.parentNode.rowIndex - 1;
        //sessionStorage.setItem("userid", row_id);
        //     window.location = '/index.html?userid=' + row_id;

        // });
        // cell.appendChild(updateeButton);
        // row.appendChild(cell);



        // tableBody.appendChild(row);
        //});


    }
    else {
        console.log('ndsansn');
    }
    // });
}


function showdata2() {
    // Retrieve data from localStorage
    let storedData = localStorage.getItem("users");

    // Check if data exists
    if (storedData) {
        // Parse the string representation of the object back to a JavaScript object
        let data = JSON.parse(storedData);

        // Now you can work with 'data' which is your JavaScript object
        console.log(data);
    } else {
        console.log("No data found in localStorage for the specified key.");
    }


    // Assuming 'data' contains your parsed data
    let tableBody = document.querySelector("#table tbody");
    let data = JSON.parse(storedData);
    data.forEach(function (rowData) {
        let row = document.createElement("tr");

        // Loop through each value in the row data
        rowData.forEach(function (cellData) {
            let cell = document.createElement("td");

            if (cellData.key == 'educationfields') {
                console.log("hii");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

}


