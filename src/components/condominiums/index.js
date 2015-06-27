global.jQuery = require('jquery');
var $ = jQuery;



class Condominiums{

	render(qSelector='.SideBar'){
		this.getCondominiums().done( (condominiums) => {
			var tpl = require('../condominiums/index.jade')({
				title: 'Algunos condominios exclusivos ',
				elements: condominiums
			});
			$(qSelector).html(tpl);
		});
	}

	renderDetail(qSelector="#root-container", condominiumInfo){
		$(qSelector).html( require('../condominiums/detail.jade')(condominiumInfo) )
	}

	getCondominiums(){
		let self = this;
		return $.getJSON('/config/condominiums.json');
	}
}

module.exports = new Condominiums();

