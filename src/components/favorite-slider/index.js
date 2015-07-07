var $ = require('jquery');
var JSONmanager = require('../JSON-manager/index.js')

export default class FavoriteSlider{
	constructor(){
		let self = this;
		JSONmanager.getContent('/config/clients_inf.json')
			.then( (clients_inf) => {
				global.cid = clients_inf.clients_id;
				this.render();
			});
	}
	render(){
		$.getJSON(`http://www.verinmuebles.com/pagewidget/fo?id=${global.cid}`, (data) => {
			let favorites = (!!data.bc.bCodes) ? data.bc.bCodes : data.bc.bCFavorites;
			if(!!favorites){
				let favoriteHtml = require('../favorite-slider/index.jade')({
					codes: favorites
				});
				$('.FavoriteSlider').html(favoriteHtml);
			}else{
				$('.FavoriteSlider').remove();
			}
		});
	}


}

