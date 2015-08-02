var JSONmanager = require('../JSON-manager/index.js');

export default class BuildingConsign{
	constructor(){
		$('#root-container').html( require('./index.jade')() );
		console.log($('#consign-form'));
		$('#consign-form').on('submit', (event) => {
			event.preventDefault();
			JSONmanager.getContent('/config/clients_inf.json')
				.then( (clients_inf) => {
					let $form = $(event.target);
					let serialized = `${$form.serialize()}&cid=${clients_inf.clients_id}`;

					$.ajax({
						url: $form.attr('action'),
						type: $form.attr('method'),
						data: serialized,
						success: (data) => {
							alert("Gracias por contactarnos");
						},
						error: (jqXHR, msg, thrownError) => {
							console.error(msg, thrownError);
							alert("Error no es posible contactarnos en este momento");
						}

					})
				});

		});
	}
}
