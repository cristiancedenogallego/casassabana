var page = require('page');
var results_search = require('../building-search/index.js');
var detail = require('../building-detail/index.js');
var jsonMan = require('../JSON-manager/index.js')
import BuildingConsign from '../building-consign/index.js';
import Favoriteslider from "../favorite-slider/index.js"
import QSAdmin from "../admin/quienes_somos.js"

class Routes{
	navigateTo(route){
		global.page(route);
	}
	defaultPage(params){
		$('#root-container').html(require('../main-page/index.jade')(params));
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
				new Favoriteslider();
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
			// Propiedades en venta
			page('/fincas', function(){
				self.defaultPage({
					showSearch: true,
					showFavSlider: false,
					showServices: false
				});
				let filters = new Array('kindbuilding=11');
				results_search.search(filters)
			})
			// Propiedades en venta
			page('/oficinas', function(){
				self.defaultPage({
					showSearch: true,
					showFavSlider: false,
					showServices: false
				});
				let filters = new Array('kindbuilding=3');
				results_search.search(filters)
			})
			page('/quienes-somos', function(){
				$('#root-container').html( require('../quienes-somos/index.jade')() );
			})

			page('/consigne-su-inmueble', function(){
				let b = new BuildingConsign();
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
						if(decodeURIComponent(path) === c.link){
							condominiums.renderDetail(undefined, c);
							results_search.search( [`codes=${c.codes}`, `page=0`], '.Condominiums-buildings' );
						}
					});
				});
			});

			page('/administrador', function(ctx){
				let Admin = require('../admin/index.js');
				let a  = new Admin();
			});

			page('/administrador/quienes-somos', function(ctx){
				  
					new QSAdmin();
			});

			page('/:permalink', function(ctx){
				let codeMatch = ctx.params.permalink.match( new RegExp('([0-9]*)(\.html)') );
				let code = codeMatch[1];
				jsonMan.getContent('/config/clients_inf.json').then( ( clients_inf ) => {
					let d = new detail(code, clients_inf.clients_id);
				});
			});

			page();
			global.page = page;
		}
	}
}
// Load routes

module.exports = new Routes();
