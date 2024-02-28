//jQuery
$(document).ready(function () {
    // Initialize DataTable
    // let table = $('#table').DataTable();
    $('#table').DataTable().draw();
    // Event delegation for delete button
    // $('#table').on('click', '.btn-delete', function () {
    //     // Get the closest row
    //     let row = $(this).closest('tr');

    //     // Get data associated with the row
    //     let rowData = table.row(row).index();

    //     // Call your delete function with the rowData
    //     deleteFunction(rowData);
    // });

});


// });

// Sample delete function
function deleteFunction(rowData) {
    // Retrieve data from localStorage
    var bool = window.confirm("You want to delete the record")
    if (bool) {
        let data = localStorage.getItem("users");
        data = JSON.parse(data);

        // Find the DataTable instance
        var dataTable = $('#table').DataTable();

        // Find the row by its ID using DataTables API
        var row = dataTable.row("#" + rowData);

        // Remove the row from the DataTable
        row.remove().draw();

        // Remove the corresponding data from the 'data' array
        data.splice(rowData, 1);

        // Update the localStorage with the updated data
        localStorage.setItem("users", JSON.stringify(data));

        // Alert the user
        alert("Record deleted");
        showdata();
        //window.location.href = 'showdata.html';
    }

}

// Sample update function
function updateFunction() {
    // console.log('Update function called with data:' + rowData);
    // alert(rowData)
    // Implement your update logic here
    let rowData = sessionStorage.getItem('userid');
    let modal = new bootstrap.Modal($('#exampleModal')[0]);
    modal.show();

    var data = JSON.parse(localStorage.getItem("users"));
    var user = data[rowData];

    if (rowData != null && user) {
        $("#submit").html("Update").prop("id", "update");
        $("#fname").val(user.fname);
        $("#lname").val(user.lname);
        $("#dob").val(user.dob);
        $("#email").val(user.email);
        $("#address").val(user.address);
        $("#gyear").val(user.gyear);

        if (user.educationfields && user.educationfields.length > 0) {
            var formfield = $("#education-details");

            for (var i = 2; i < user.educationfields.length; i++) {
                var newRow = `
                        <div class="row details" id="details">
                            <div class="col-lg mt-md-0 mt-3">
                                <label>Degree/Board</label>
                                <input type="text" class="form-control" id="degree" required placeholder="Enter Degree"/>
                            </div>
                            <div class="col-lg mt-md-0 mt-3">
                                <label>School/College</label>
                                <input type="text" class="form-control" id="school" required placeholder="Enter College/School"/>
                            </div>
                            <div class="col-lg mt-md-0 mt-3">
                                    <label>Start Date</label>
                                    <input type="date" class="form-control" id="sdate" required placeholder="Enter Start Date"/>
                            </div>
                            <div class="col-lg mt-md-0 mt-3">
                                    <label>Passout Year</label>
                                    <input type="date" class="form-control" id="pdate" required placeholder="Enter Passout date"/>
                            </div>
                            <div class="col-lg mt-md-0 mt-3">
                                    <label>Percentage</label>
                                    <input type="number" min="0" max="100" class="form-control" id="percentage" required placeholder="Don't Use % Sign"/>
                            </div>
                            <div class="col-lg mt-md-0 mt-3">
                                    <label>Backlog</label>
                                    <input type="number" min="0" max="10" class="form-control" id="backlog" required placeholder="Enter Backlog"/>
                            </div>
                            <div class="col-lg text-center mt-md-0 mt-3 delete" style="visibility:visible">
                                    <label>Delete</label>
                                    <button type="button" class="btn btn-danger " ><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                    `;
                formfield.append(newRow);
            }

            $(".education-details .details").each(function (index) {
                var $inputs = $(this).find('input');
                $inputs.each(function () {
                    var fieldName = $(this).attr('id');
                    $(this).val(user.educationfields[index][fieldName]);
                });
            });
        } else {
            console.error("User data or educationFields property is undefined.");
        }
    }


}





// Function to validate the form inputs
function validateForm() {
    // Example validation, you can add more checks as needed
    const percentage = $("#percentage").val();
    var lname = $("#lname").val();
    var gyear = $("#gyear").val();
    var dob = $("#dob").val();

    // Extract the year

    // Check if any of the required fields are empty
    // if (fname === "" || lname === "" || email === "" || dob === "") {
    //     alert("Please fill out all required fields.");
    //     console.log("fill properly");
    //     return false; // Validation failed
    // }

    $('.student-details .row').each(function () {
        $(this).find('input').each(function () {
            //console.log(ele);
            if ($(this).val() == null || $(this).val() == '') {
                $(this).css('border', '2px solid red');
            } else {
                $(this).css('border', '2px solid green');
            }
        });

        const emailInput = $("#email");
        const email = emailInput.val().trim();

        if (email === '') {
            emailInput.css('border', '2px solid red');
        }

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(email)) {
            emailInput.css('border', '2px solid green');
        } else {
            emailInput.css('border', '2px solid red');
        }
    });

    var gyear = $("#gyear");
    var dob = $("#dob");

    if (gyear && dob) { // Check if both elements exist
        var gyearDate = new Date(gyear.val()); // Assuming gyear is an input element, use .val() to get its value
        var birthDate = new Date(dob.val()); // Assuming dob is an input element, use .val() to get its value
        var currentDate = new Date(); // Get today's date
        var age = gyearDate.getFullYear() - birthDate.getFullYear();
        if (!gyear.val() && !dob.val()) {
            gyear.css("border", "2px solid red");
            dob.css("border", "2px solid red");
            console.log("Graduation year cannot be empty.");
            return; // Exit the function or handle this case accordingly
        } else {
            gyear.css('border', '2px solid green'); // Reset border
            dob.css('border', '2px solid green');
        }
        // Check if birthDate is greater than currentDate
        if (birthDate > currentDate && gyearDate > currentDate) {
            dob.css("border", "2px solid red"); // Apply border to indicate invalid date
            gyear.css("border", "2px solid red");
            console.log(" Date cannot be in the future.");
            return; // Exit the function or handle this case accordingly
        }
        if (gyearDate < birthDate || (age === 0 && gyearDate.getDate() < birthDate.getDate())) {
            age--;
        }

        // Check if age is less than 18
        if (age < 18) {
            gyear.css("border", "2px solid red");
            dob.css("border", "2px solid red");
            alert("Age Must Be Above 18.....")
        } else {
            // Reset border to default or do something else
            gyear.css('border', '2px solid green'); // Reset border
        }
    } else {
        gyear.css("border", "2px solid red");
        dob.css("border", "2px solid red");
        // Or handle this case in another appropriate way
    }

    $('.education-details .row').each(function () {
        $(this).find('input').each(function () {
            //console.log(ele);
            if ($(this).val() == null || $(this).val() == '') {
                $(this).css('border', '2px solid red');
            } else {
                $(this).css('border', '2px solid green');
            }
        });

        const percentage = $("#percentage");
        const re = /[0-9]/;
        if (percentage.val() >= 0 && percentage.val() <= 100) {
            percentage.css('border', '2px solid green');
        } else {
            percentage.css('border', '2px solid red');
        }
        if (re.test(percentage.val().trim())) {
            percentage.css('border', '2px solid green');
        } else {
            percentage.css('border', '2px solid red');
        }

        const sdate = $("#sdate");
        const pdate = $("#pdate");

        // Check if both fields are not empty
        if (sdate.val() !== "" && pdate.val() !== "") {
            var startDate = new Date(sdate.val());
            var passoutDate = new Date(pdate.val());
            var currentDate = new Date();

            var startYear = startDate.getFullYear();
            var passoutYear = passoutDate.getFullYear();
            var currentYear = currentDate.getFullYear();

            if (passoutYear > startYear && passoutYear <= currentYear && startYear <= currentYear &&
                startDate < currentDate && passoutDate < currentDate) {
                // Both conditions are satisfied
                sdate.css("border", "2px solid green");
                pdate.css("border", "2px solid green");
            } else {
                // One or both conditions are not satisfied
                sdate.css("border", "2px solid red");
                pdate.css("border", "2px solid red");
            }
        } else {
            // One or both fields are empty
            sdate.css("border", "2px solid red");
            pdate.css("border", "2px solid red");
        }
    });

    // Additional validation checks can be added here

    return true; // Validation passed
}



function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    // Validate the form
    if (validateForm()) {
        // If validation passes, call the ShowDetails() function
        if ($("#submit").length) {
            ShowDetails();
        } else {
            updateData();
            // alert("User Details updated Successfully");
            $("#update").prop("id", "submit");
        }
    }
}

// Attach event listener to the form submission using jQuery
$("#form").submit(handleSubmit);



function add() {
    let formfield = $('#education-details');
    let row = $('<div class="row details"></div>');

    let col1 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input1 = $('<input type="text" placeholder="Enter Your First Name" id="degree" class="form-control">');
    col1.append(input1);
    row.append(col1);

    let col2 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input2 = $('<input type="text" placeholder="Enter Your First Name" id="school" class="form-control">');
    col2.append(input2);
    row.append(col2);

    let col3 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input3 = $('<input type="date" placeholder="Enter Your Starting Date" id="sdate" class="form-control">');
    col3.append(input3);
    row.append(col3);

    let col4 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input4 = $('<input type="date" placeholder="Enter Your Passout Year" id="pdate" class="form-control">');
    col4.append(input4);
    row.append(col4);

    let col5 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input5 = $('<input type="text" placeholder="Don\'t Use % Sign" id="percentage" class="form-control">');
    col5.append(input5);
    row.append(col5);

    let col6 = $('<div class="col-lg mt-md-0 mt-3"></div>');
    let input6 = $('<input type="text" placeholder="Enter Backlog" id="backlog" class="form-control">');
    col6.append(input6);
    row.append(col6);

    let col7 = $('<div class="col-lg text-center mt-md-0 mt-3"></div>');
    let input7 = $('<input type="button" value="-" class="btn btn-danger">');
    col7.append(input7);
    row.append(col7);

    input7.on('click', function () {
        row.remove();
    });

    formfield.append(row);

    alert('Added new row');
}

// $('.submit').on('click', function () {
//     $('#display-data').css('visibility', 'visible');
//     let firstname = $('#fname').val();
//     let lname = $('#lname').val();
//     let dob = $('#dob').val();
//     let email = $('#email').val();
//     let address = $('#address').val();
//     let gy = $('#gyear').val();

//     let tr1 = $('<tr></tr>').html(`
//         <td>${firstname}</td>
//         <td>${lname}</td>
//         <td>${dob}</td>
//         <td>${email}</td>
//         <td>${address}</td>
//         <td>${gy}</td>
//     `);
//     $('#table tbody').append(tr1);
// });

function submit() {
    if ($("#submit").length) {
        $("#submit").html("Submit");
    }
    if ($("#update").length) {
        $("#update").prop("id", "submit");
    }
    //button.setAttribute("onclick", "ShowDetails()");
}


function updateData() {
    let userid = sessionStorage.getItem("userid");
    //alert(userid);
    let data = [];
    let educationField = {
        degree: ' ',
        school: ' ',
        sdate: ' ',
        pdate: ' ',
        percentage: ' ',
        backlog: 0
    }

    let studentDetails = {
        fname: '',
        lname: ' ',
        dob: ' ',
        email: ' ',
        address: ' ',
        gyear: ' ',
        educationfields: []
    }

    $('.student-details .row').each(function () {
        $(this).find('input').each(function () {
            studentDetails[$(this).attr('id')] = $(this).val();
        });
    });

    data.push(studentDetails);

    $('.education-details .row').each(function () {
        $(this).find('input').each(function () {
            educationField[$(this).attr('id')] = $(this).val();
        });
        studentDetails.educationfields.push(Object.assign({}, educationField));
    });

    var users = JSON.parse(localStorage.getItem("users")) || [];
    users[userid] = studentDetails;
    console.log(users[userid])
    console.log(studentDetails);

    localStorage.setItem("users", JSON.stringify(users));
    alert("User Updated successfully!");
    $('#form')[0].reset();

    $('#exampleModal').modal('hide');
    let tableBody = $("#table #data-body");
    tableBody.empty();

    showdata();
}

function ShowDetails() {
    let data = [];
    let educationField = {
        degree: ' ',
        school: ' ',
        sdate: ' ',
        pdate: ' ',
        percentage: ' ',
        backlog: 0
    }

    let studentDetails = {
        fname: '',
        lname: ' ',
        dob: ' ',
        email: ' ',
        address: ' ',
        gyear: ' ',
        educationfields: []
    }

    $('.student-details .row').each(function () {
        var studentRow = {};
        $(this).find('input').each(function () {
            studentRow[$(this).attr('id')] = $(this).val();
        });
        $.extend(studentDetails, studentRow);
    });

    data.push(studentDetails);

    $('.education-details .row').each(function () {
        var educationRow = {};
        $(this).find('input').each(function () {
            educationRow[$(this).attr('id')] = $(this).val();
        });
        studentDetails.educationfields.push($.extend({}, educationField, educationRow));
    });

    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(studentDetails);
    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully!");
    //window.location.replace("showdata.html");

    $('#form')[0].reset();

    $('#exampleModal').modal('hide');
    let tableBody = $("#table #data-body");
    tableBody.empty();

    showdata();
}

function clear() {
    var form = $('.reset')[0];
    $("#submit").html("Submit");
    form.reset();
}

$('.btn-close').on("click", clear);

function showdata() {
    // Retrieve data from localStorage
    var data = localStorage.getItem("users");
    let tableHeader = $("#table thead");
    let tableBody = $("#table #data-body");


    //tableBody.empty(); // Clear existing table rows
    // Check if data exists
    if (data) {
        data = JSON.parse(data); // Parse the data if it's in JSON format

        console.log(data);

        // Loop through the data and create table rows
        data.forEach(function (entry) {
            console.log(data.indexOf(entry));
            var row = $("<tr></tr>");

            // Iterate over each property in the entry
            $.each(entry, function (key, value) {
                if (key !== "educationfields") {
                    var cell = $("<td></td>").text(value);
                    row.append(cell);
                }
            });

            // Append the row to the table body
            tableBody.append(row);

            // Append the delete and update buttons to the row
            var deleteButton = $("<button></button>").text("Delete").addClass("btn btn-danger");
            deleteButton.on("click", function () {
                row.remove();
                var index2 = data.indexOf(entry);
                //alert(index2)
                data.splice(index2, 1);
                localStorage.setItem("users", JSON.stringify(data));
                alert("Record of " + index2 + " id  deleted");
            });
            var deleteCell = $("<td></td>").append(deleteButton);
            row.append(deleteCell);

            var updateButton = $("<button></button>").text("Update").addClass("btn btn-warning");
            updateButton.attr("data-bs-toggle", "modal");
            updateButton.attr("data-bs-target", "#exampleModal");
            updateButton.attr("data-bs-dismiss", "modal");
            updateButton.on("click", function () {

                var index2 = data.indexOf(entry);
                sessionStorage.setItem("userid", index2);
                updateFunction();
            });
            var updateCell = $("<td></td>").append(updateButton);
            row.append(updateCell);
        });
    } else {
        console.log('No data found');
    }


    // Periodically refresh the data
    //setInterval(showdata, 1000); // Refresh every 5 seconds (adjust as needed)
}

/*
function showdata2() {
    // Retrieve data from localStorage
    let storedData = localStorage.getItem("users");

    // Check if data exists
    if (storedData) {
        // Parse the string representation of the object back to a JavaScript object
        let data = JSON.parse(storedData);

        // Now you can work with 'data' which is your JavaScript object
        console.log(data);

        // Assuming 'data' contains your parsed data
        let tableBody = $("#table tbody");

        data.forEach(function (rowData) {
            let row = $("<tr></tr>");

            // Loop through each value in the row data
            rowData.forEach(function (cellData) {
                let cell = $("<td></td>");

                if (cellData.key == 'educationfields') {
                    console.log("hii");
                }

                cell.text(cellData);
                row.append(cell);
            });

            tableBody.append(row);
        });
    } else {
        console.log("No data found in localStorage for the specified key.");
    }
}
*/
