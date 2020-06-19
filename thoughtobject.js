/* ThoughtObject is a class to store the data of each object in the web. 
   It contains the x, y coordinates of the object in the world, as well
   as contents like name, links, and written entries */

class ThoughtObject {
    constructor(objname, x, y) {
        this._name = objname;
        this._links = [];
        this._theses = [];
        this._inset = y + "px auto auto " + x + "px"; // world position
    }

    get name() {
        return this._name;
    }

    get links() {
        return this._links;
    }

    get theses() {
        return this._theses;
    }

    get inset() {
        return this._inset;
    }

    setInset(i) {
        this._inset = i;
    }

    // Add a link associated with this thought object
    addLink(l) {
        this._links.push(l);
    }

    addThesis(t) {
        this._theses.push(t);
    }
}
