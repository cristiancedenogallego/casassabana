var page = require('page');
var results_search = require('../building-search/index.js');

class Routes{
	navigateTo(route){
		global.page(route);
	}
	defaultPage(params){
		return new Promise( (resolve, reject) =>{
			$('#root-container').html(require('../main-page/index.jade')(params));
			resolve();
		})
	}
	constructor(){
		if(typeof global.page === "undefined"){
			var self = this;

			// Homepage
			page('/', function(){
				self.defaultPage({
					showSearch: true,
					showFavSlider: true,
					showServices: true
				});
				let fav = require("../favorite-slider/index.js")
				fav.render()
			});
			// Propiedades en venta
			page('/venta', function(){
				self.defaultPage({
					showSearch: true,
					showFavSlider: false,
					showServices: false
				});
				let filters = new Array('kindoffer=2');
				results_search.search(filters)
			})
			// Propiedades en arriendo
			page('/arriendo', function(){
				self.defaultPage({
					showSearch: true,
					showFavSlider: false,
					showServices: false
				});
				let filters = new Array('kindoffer=1');
				results_search.search(filters)
			})

			page('/quienes-somos', function(){
				$('#root-container').html( require('../quienes-somos/index.jade')() );
			})

			page('/condominios', function(){
				let condominiums = require('../condominiums/index.js');
				condominiums.render('#root-container')
			})

			page('/contacto', function(){
				$('#root-container').html( require('../contact-form/index.jade')({_class: 'ContactForm--fullpage'}) );
				require('../contact-form/index.js');
			})

			page('/condominio/:condominio', function(ctx, next){
				let condominiums = require('../condominiums/index.js');
				let path = ctx.path;
				condominiums.getCondominiums().done( (data) => {
					$.each(data, (index, c) => {
						if(path === c.link){
							condominiums.renderDetail(undefined, c);
							results_search.search( [`codes=${c.codes}`, `page=0`], '.Condominiums-buildings' );
						}
					});
				});
			});

			page();
			global.page = page;
		}
	}
}
// Load routes

module.exports = new Routes();



