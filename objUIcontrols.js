/* Functions for creating, updating, destroying, and managing the UI of objects */

// TODO: Make functions more efficient by only computing what absolutely needs to be each time.
// For instance update might needlessly remake some elements which never change.

// create the display block for a thought object
function buildObjectUI(obj) {
    var container = document.createElement("div");
    container.id = obj.name;
    container.className = "object";

    // create name
    var name = buildObjectUI_name(obj);
    name.appendTo(container);

    // create list of links
    var linksDiv = buildObjectUI_links(obj);
    linksDiv.appendTo(container);

    // create list of theses
    var thesesDiv = buildObjectUI_theses(obj);
    thesesDiv.appendTo(container);

    $(container).css("inset", newObj.inset); // set world position

    return container;
}

// Takes in a ThoughtObject.
// Uses data from the ThoughtObject to construct a name component of a container
function buildObjectUI_name(obj) {
    var name = $(document.createElement("span"));
    name.addClass("object-title");
    name.text(obj.name);

    return name
}

// Takes in a ThoughtObject.
// Uses data from the ThoughtObject to construct a links component of a container
function buildObjectUI_links(obj) {
    var linksDiv = $("<div></div>");

    var linksTitle = $(document.createElement("span")); // title of links section
    linksTitle.text("Links");
    linksDiv.append(linksTitle);

    var newLinkButton = $(document.createElement("button")); // button for new links
    newLinkButton.text("+");
    newLinkButton.addClass("new-link-button");
    linksDiv.append(newLinkButton);

    var newLinkForm = $(document.createElement("form")); // form to enter new links
    newLinkForm.addClass("new-link-form");
    newLinkForm.attr("autocomplete", "off");
    var linkInput = $(document.createElement("input"));
    linkInput.addClass("new-link-input");
    linkInput.attr("type", "input");
    newLinkForm.append(linkInput);
    newLinkForm.css("display", "none"); // default to not showing
    linksDiv.append(newLinkForm);

    var list = obj.links;
    var links = $(document.createElement("ul"));
    for (var i = 0; i < list.length; i++) {
        var li = $("<li></li>");

        var a = $("<a></a>");
        a.text(list[i]);
        a.attr("href", list[i]);
        a.attr("target", "_blank");

        li.append(a);
        links.append(li);
    }
    linksDiv.append(links);

    return linksDiv;
}

function buildObjectUI_theses(obj) {
    var thesesDiv = $("<div></div>");

    var thesesTitle = $(document.createElement("span")); // title of theses section
    thesesTitle.text("Theses");
    thesesDiv.append(thesesTitle);

    var newThesesButton = $(document.createElement("button")); // button for new thesis
    newThesesButton.text("+");
    newThesesButton.addClass("new-thesis-button");
    thesesDiv.append(newThesesButton);

    var submitThesisButton = $(document.createElement("button"));
    submitThesisButton.text("Submit");
    submitThesisButton.addClass("submit-thesis-button");
    submitThesisButton.css("display", "none");
    thesesDiv.append(submitThesisButton);

    var newThesisForm = $(document.createElement("form"));
    newThesisForm.addClass("new-thesis-form");
    var newThesisFormText = $(document.createElement("textarea"));
    newThesisFormText.addClass("new-thesis-text");
    newThesisForm.append(newThesisFormText);
    newThesisForm.css("display", "none");
    thesesDiv.append(newThesisForm);

    var list = obj.theses;
    var theses = $(document.createElement("ul"));
    for (var i = 0; i < list.length; i++) {
        var li = $("<li></li>");

        var p = $("<p></p>");
        p.text(list[i]);
    
        li.append(p);
        theses.append(li);
    }
    thesesDiv.append(theses);

    return thesesDiv;
}

// Updates the UI contents of an object without resetting the container
// takes in the unique name string of the object (which is the key in the dict
// as well as the unique id of the associated div)
function updateObjectUI(name) {

    var container = $("#" + name); // get the div associated with that name
    container.empty(); // clear div

    var objectData = dict[name];
    console.log(dict);

    // create name
    var name = buildObjectUI_name(objectData);
    name.appendTo(container);

    // create list of links
    var linksDiv = buildObjectUI_links(objectData);
    linksDiv.appendTo(container);

    // create list of theses
    var thesesDiv = buildObjectUI_theses(objectData);
    thesesDiv.appendTo(container);

}

// jQuery event functions
$(document).ready(function() {  
    
    // Event for clicking on the '+' new link button.
    $(document).on("click", ".new-link-button", function() { // this method is necessary to find dynamically created content
        
        var parent = $(this).parent().parent(); // get the object the link button is inside of

        if ($(this).text() == "+") { // if the button has not been clicked yet
            $(this).text("X");
            var linkForm = $(parent).find(".new-link-form");
            linkForm.css("display", "block");
        } else { // if the user is trying to cancel adding the link
            updateObjectUI(parent.attr("id"));
        }

    });

    $(document).on("submit", ".new-link-form", function(e) {
        var parent = $(this).parent().parent(); 
        e.preventDefault();
        $(this).css("display", "none");

        var titleSpan = $(parent).find(".object-title"); // get the title span
        var name = titleSpan[0].innerText; // get the text of the title
        dict[name].addLink($(this).find(".new-link-input").val()); // use the title to look up the object data in the dictionary
        updateObjectUI(parent.attr("id"));
    });

    $(document).on("click", ".new-thesis-button", function() {
        var parent = $(this).parent().parent(); 

        if ($(this).text() == "+") { // if the button has not been clicked yet
            $(this).text("X");
            var form = $(parent).find(".new-thesis-form");
            var button = $(parent).find(".submit-thesis-button");
            form.css("display", "block");
            button.css("display", "block");
        } else { // if the user is trying to cancel adding the link
            updateObjectUI(parent.attr("id"));
        }

 
    });

    $(document).on("click", ".submit-thesis-button", function() {
        var parent = $(this).parent().parent(); 
        var form = $(parent).find(".new-thesis-text"); 
        form.css("display", "none");

        var titleSpan = $(parent).find(".object-title"); 
        var name = titleSpan[0].innerText; 
        dict[name].addThesis(form.val()); 
        updateObjectUI(parent.attr("id"));
    });

});

// activiate the jQuery UI draggable functionality for an object
function activateDraggable(obj) {
    $(document).ready(function() {
        $(obj).draggable({
            stop: function() {
                $(obj).css("height", "auto"); // reenable dynamic div size after dragging
                $(obj).css("width", "auto");
                // update underlying object data with new position
                dict[obj.id].setInset(obj.style.inset);
                // update local storage
                // ...
            }
        });
    });
}    