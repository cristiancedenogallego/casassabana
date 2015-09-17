var $ = require('jquery');
var results_building = require('../building-results/index.js');
var JSONmanager = require('../JSON-manager/index.js');

class BuildingSearch{
	constructor(){
		this.codes = '';
		$(document).on('submit','#search-form', (event) => {
			event.preventDefault();
			this.page = 0;
			let filters = [];
			let query = $('#querySearch').val();
			if(query !== ''){
				filters.push(`cod=${query}`);
			}
			this.search(filters, '.Condominiums-buildings');
		});

		$('#root-container').on('click', '#resultsItem-loadMore', (event) => {
			let $target = $(event.target);
			let nextPage = parseInt( $target.data('page') ) + 1;
			let query = $('#querySearch').val();
			let filters = typeof global.filters !== 'undefined' ? global.filters : [];
			this.page = nextPage;

			if(query){
				filters.push(`cod=${query}`);
			}
			filters.push(`page=${nextPage}`);

			this.search(filters, '.Condominiums-buildings');
		});
	}


	search(filters, renderOn){
		global.filters = filters;
		let self = this;
		let fullfilters = filters.join('');

		if(fullfilters.indexOf('codes=') === -1 && this.codes !== ''){
			filters.push(this.codes);
		}

		else if(fullfilters.indexOf('codes=') > -1){
			let m = fullfilters.match(/codes=[0-9,]*/);
			this.codes = m[0];
		}


		$.each(filters, (index, el)=>{
			if(!el){
				filters.splice(index, 1);
			}
		});

		JSONmanager.getContent('/config/clients_inf.json')
			.then( (clients_inf) => {
				let url = `http://www.verinmuebles.com/pagewidget/findcondition?id=${clients_inf.clients_id}&${filters.join('&')}`;
				$.ajax({
					url: url,
					type: 'get',
					success: (data) => {
						results_building.renderInElement(renderOn, data, self.page);
					},
					error: (jqError, msg, throwErr) => {
						console.error(msg);
					}

				});
			});
	}

}

module.exports = new BuildingSearch();


