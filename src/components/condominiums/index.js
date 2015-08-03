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

	renderDetail(qSelector="#root-container", condominiumInfo, vid){
        if(vid){
            condominiumInfo.video_url = vid; // push video youtube 
        }
		$(qSelector).html( require('../condominiums/detail.jade')(condominiumInfo) )
	}

	getCondominiums(){
	  let promise = new $.Deferred();
		$.getJSON('/config/condominiums.json')
			.done( (data) => {
				promise.resolve( data.sort( this.sortCondominiums ) );
			})
			.error( (xhr, msg, thr) => {
				console.error(msg);
				return {};
			});
		return promise;
	}

	sortCondominiums(a,b){
		if(a.order < b.order){
			return -1;
		}
		else if (a.order > b.order) {
			return 1;
		}
		else{
			return 0;
		}
	}
}

module.exports = new Condominiums();
