var $ = require('jquery');
var results_building = require('../building-results/index.js');
var JSONmanager = require('../JSON-manager/index.js')

class BuildingSearch{
	constructor(){
		$(document).on('submit','#search-form', (event) => {
			event.preventDefault();
			this.page = 0;
			let filters = new Array();
			let query = $('#querySearch').val();
			if(query !== ''){
				filters.push(`cod=${query}`);
			}
			this.search(filters);
		});

		$('#root-container').on('click', '#resultsItem-loadMore', (event) => {
			let $target = $(event.target);
			let nextPage = parseInt( $target.data('page') ) + 1;
			let query = $('#querySearch').val();
			let filters = new Array();
			this.page = nextPage;

			if(query !== ''){
				filters.push(`cod=${query}`);
			}
			filters.push(`page=${nextPage}`);
			this.search(filters);
		});
	}
	search(filters, renderOn){
		let self = this;
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


