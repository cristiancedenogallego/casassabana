global.$ = require('jquery');
var JSONmanager = require('../JSON-manager/index.js')
var $form = $('#form-contact');

$form.on('submit' , (event) => {
	event.preventDefault();
	
	let frmData = $form.serialize();
	let url = $form.attr('action');
	let method = $form.attr('method');
	JSONmanager.getContent('/config/clients_inf.json')
		.then( (clients_inf) => {
			let cid = clients_inf.clients_id;
			frmData = `${frmData}&pgm=${cid}`;

			$.ajax({
				url:  url,
				data: frmData,
				type: method,
				success: function( data ){
					alert("Gracias por contactarnos")			
				},
				error: function(){
					alert("Ha ocurrido un error por favor intenta contactarnos de nuevo mas tarde.");
				}
			});		
		});
});