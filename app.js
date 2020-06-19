
/* ----- CONSTANTS ----- */
    var defaultY = 150;
    var defaultX = 50;

/* ----- DOM PARSE ----- */

    var newObjButton = document.getElementById("create-obj");

    // objects div
    var objectsDiv = document.getElementById("objects");

    // new object input form
    var newObjForm = document.getElementById("new-obj-form");
    var newObjFormName = document.getElementById("newobj-name-input");
    var newObjFormLink = document.getElementById("newobj-link-input");

/* ----- GLOBAL DICTIONARY OF OBJECT NAMES TO THOUGHT OBJECTS ----- */
var dict = {};


/* ----- NEW OBJECT CREATION EVENTS ----- */

// When the new object button is clicked,
// display the fields to enter the new object's info
newObjButton.addEventListener("click", function(e) {
    e.preventDefault();
    newObjForm.style.display = "block";
});

// Create new object button clicked
newObjForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form submission from refreshing page

    var name = newObjFormName.value; 

    if (name.length == 0) {  // TODO: make these fail in a less janky way
        throw "No empty title!";
    }

    if (name in dict) {
        throw "No duplicate names!";
    }

    newObj = new ThoughtObject(name, defaultX, defaultY);

    // add object to global dict
    dict[name] = newObj;

    // add object to world
    var newObjUI = buildObjectUI(newObj)
    objectsDiv.appendChild(newObjUI);
    activateDraggable(newObjUI);

    newObjForm.reset();
    newObjForm.style.display = "none";
});


