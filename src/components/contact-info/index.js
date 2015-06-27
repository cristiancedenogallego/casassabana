var jsonMan = require('../JSON-manager/index.js')


class ContactInfo{

	loadInfo( infoArray ){
		$.each(infoArray, (index, el) => {
			if(!! el.value){
				$(el.qSelector).html(`<label>${el.label}: </label><span>el.value</span>`);
			}
		});
	}

	constructor(){
		jsonMan.getContent('/config/clients_inf.json').then( ( clients_inf ) => {
			let arrMan = require('../array-manager/index.js');
			let phones = arrMan.joinArray( [clients_inf.phone1, clients_inf.phone] );
			console.log(phones);
			let html = require('../contact-info/index.jade')({
				address: clients_inf.address,
				phones: phones,
				workinghours: clients_inf.hourary,
				country: clients_inf.country_name,
				city: clients_inf.city,
				email: clients_inf.email1
			});


			$('#contact-info').html(html);
		} );
	}

}

module.exports = new ContactInfo();
