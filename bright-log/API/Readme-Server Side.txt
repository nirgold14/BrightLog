---- First Installation:

1. Install Node (Chrome's V8 JS Engine)
    1.1 run node: $ node
        1.1.1 allow you to run js in the terminal.
        1.1.2 node temp.js --> run file

2. Install Postman


--- NODE-JS
1. npm - Node Package Manager
    1.1 npm install 'package-name'
    1.2 import a package: var x = require('package-name'); 

2. Init the project
    2.1 After creating the file server.js, we should do: $npm init
        It will setup our project as Node Project.
    2.2 Package.json

3. Dependecies
    3.1 $ npm install --save express (Handle REST web requests)
        --save : add it to the dependecies of the project.
    3.2 $ npm install --save body-parser (Handle JSON requests)

4. Create and export a module:
    ^^^^^ Print.js
    var print = function(thingToPrint){
        console.log(thingToPrint);
    }

    module.export = print;

    ^^^^^ App.js
    var print = require('./print');
    
    print();

--- MONGO DB



--- Tips & Tricks

* mongoose.model('Product',product) - It's define the features of the model, so no other data can enter this model.


