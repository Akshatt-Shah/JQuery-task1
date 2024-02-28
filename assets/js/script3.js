function updatedata() {

    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userid');
    var body = document.getElementById('body1');

    alert(userId);
    var data = localStorage.getItem("users");
    data = JSON.parse(data);

    var obj = JSON.stringify(data[userId]);
    console.log(obj);

    var jsonData = obj;
    var obj = jsonData[0];
console.log(obj);
    var container = document.getElementById("inputFieldsContainer");


    jsonData.forEach(function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                // Check if the property is an object or an array
                if (Array.isArray(obj[key])) {
                    // If it's an array, loop through its elements
                    obj[key].forEach(function(innerObj, index) {
                        for (var innerKey in innerObj) {
                            if (innerObj.hasOwnProperty(innerKey)) {
                                var input = document.createElement("input");
                                input.setAttribute("type", "text");
                                input.setAttribute("value", innerObj[innerKey]);
                                input.setAttribute("class", "form-control");
                                input.setAttribute("placeholder", innerKey);
                                input.setAttribute("id", innerKey ); // Assign unique id based on field name
                                container.appendChild(input);
                            }
                        }
                    });
                } else {
                    // If it's an object, create input field for each key-value pair
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("value", obj[key]);
                    input.setAttribute("class", "form-control");
                    input.setAttribute("placeholder", key);
                    input.setAttribute("id", key); // Assign unique id based on field name
                    container.appendChild(input);
                }
            }
        }
    });
    
    // Create an "Update" button
    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.setAttribute("type", "button");
    updateButton.setAttribute("class", "btn btn-warning mx-auto");
    updateButton.addEventListener("click", function() {
        updateLocalStorageWithId("0");
    //     // Add your update logic here
    //     var inputs = container.querySelectorAll("input");
    //     inputs.forEach(function(input) {
    //         var id = input.id;
    //         var value = input.value;
    //         // Update the corresponding value in localStorage
    //         localStorage.setItem(id, value);
    //     });
    //     alert("Data updated successfully!");
    });
    container.appendChild(updateButton);


    // Function to gather input field data and format it into the desired object structure
function gatherInputData() {
    var inputData = {}; // Object to store input field data
    
    // Loop through the input fields
    container.querySelectorAll("input").forEach(function(input) {
        // Retrieve the id and value of each input field and add it to the inputData object
        inputData[input.id] = input.value;
    });
    
    return inputData; // Return the input data object
}

// Function to update the data in localStorage
function updateLocalStorageWithId(id) {
    // Gather the input field data and format it into the desired object structure
    var inputData = gatherInputData();
    
    // Get the existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem(id)) || {};
    
    // Merge the existing data with the new input data
    var updatedData = { ...existingData, ...inputData };
    
    // Update the data in localStorage with the given id
    localStorage.setItem(id, JSON.stringify(updatedData));

    // Optional: Notify the user that the update is successful
    alert("Data updated successfully with ID: " + id);
}

// Example: Update the data in localStorage with ID "0"


    }