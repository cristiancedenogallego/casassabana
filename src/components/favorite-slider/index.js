var $ = require('jquery');
var JSONmanager = require('../JSON-manager/index.js')

class FavoriteSlider{
	constructor(){
		let self = this;
		JSONmanager.getContent('/config/clients_inf.json')
			.then( (clients_inf) => {
				self.cid = clients_inf.clients_id;
				self.render();
			});
	}
	render(){
		let self = this;
		$.getJSON(`http://www.verinmuebles.com/pagewidget/fo?id=${self.cid}`, (data) => {
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

module.exports = new FavoriteSlider();

