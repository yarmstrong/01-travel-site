/* this REQUIRE syntax is the same as what we have used with GULP
    however REQUIRE will not work within a web browser while it works
    in our GULP file bec GULP runs within the context of node.js.
    node.js supports the REQUIRE and IMPORT functionalities.
    Web browser has no idea what REQUIRE means so we need to leverage
    WEBPACK tool: it will look for REQUIRE and IMPORT and bundle them 
    all together in one JS file that will work in WEB BROWSER
*/

var $ = require('jquery');
import Person from './modules/Person';
/* var Person = require('./modules/Person'); replaced by import Person from './modules/Person';
    no need to use REQUIRE since we are now using babel, which allows us to use
    es6 import and export functionalities

*/

class Adult extends Person {
    payTaxes() {
        console.log(this.name + ' now owes $10.00 in taxes.');
    }
}

var john = new Person('John Doe', 'blue');
john.greet();

var jane = new Adult('Jane Doe', 'pink');
jane.greet();
jane.payTaxes();

$("h1").remove();