global.jQuery = require('jquery');
require('../contact-info/index.js')

let $ = jQuery;


$('#login-modal-submit').on('click', () => {
	$('#login-form').trigger('submit')
});
