global.jQuery = require("jquery");
global.bootstrap = require('bootstrap');
var Routes = require("../components/router/index.js")
var sideBar = require("../components/condominiums/index.js")
sideBar.render();
require("../components/layout/index.js")
require("../components/contact-form/index.js")
require("../components/building-search/index.js")
