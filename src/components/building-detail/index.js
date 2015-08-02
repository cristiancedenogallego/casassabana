var $ = require('jquery');
var slider =  require('../slider-detail/index.js');
var PhotoViewer = require('../photoviewer/phoviewer.js')

export default class BuildingDetail{
	loadViewer(){
		const BYLINE_POSITION_RIGHT = 30;
		const BYLINE_POSITION_BOTTOM = 20;
		var viewer = new PhotoViewer();
		viewer.disableEmailLink();
		viewer.disablePhotoLink();
		viewer.enableAutoPlay();
		viewer.setShadeColor("#000000");
		viewer.setBackgroundColor("#CCCCCC");
		viewer.setSlideDuration(3000);

		$('[u="image"]').each(function(i) {
				viewer.add($(this).attr('src'),'');
				$(this).click(function() {
						viewer.show(i);
						return false;
				});
		});
	}
	constructor(code, clients_id){
		this.code = code;
		$.post('http://www.verinmuebles.com/pagewidget/loaddetails',{usercode: clients_id, code: code}, (data) => {
			let detail = data.model.bDetails[0];
			let price = detail.bInPrices.offer_value.toString().replace('.00', '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			let features = [
			{label: "Habitaciones", value: detail.rooms},
			{label: "Baños",value: detail.bathrooms},
			{label: "Depositos", value: detail.deposit},
			{label: "Garajes", value: detail.garages},
			{label: "Pisos/Niveles", value: detail.level},
			{label: "Capacidad", value: detail.persons},
			{label: "Estrato", value: detail.stratum}
			];

			let verinmuebles_title = `${detail.kindOffer.offer_reference_res} ${detail.kindBuilding.building_name} ${detail.sector0.sector_name} ${detail.area_m} ${detail.areaUm.metter_reference}`;
			let _html = require('../building-detail/index.jade')({
				price: price,
				features: features,
				images: detail.bInImages,
				verinmuebles_title: verinmuebles_title,
				title: detail.title,
				comments: detail.comments,
				code: data.model.building_code,
				lat: detail.lat,
				lng: detail.lng,
				views: detail.visits,
				agents: data.model.agents,
				clients: data.model.clients,
				sector: detail.sector0.sector_name,
				city: detail.city0.CityName,
				label: detail.bInLabels[0].label.name,
				labelstyle: (!! detail.bInLabels[0].label_color) ? `background: ${detail.bInLabels[0].label_color}`: ''
			});
			$('#root-container').html(  _html )
			this.loadViewer();
			let s = new slider();
		});
	}
}
