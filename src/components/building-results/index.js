var $ = require('jquery');


class BuildingResults{

	renderInElement(qSelector='#main-content', resultsObject, actualPage=0){
		let {count, model} = resultsObject;
		let resultsHtml = '<h3 class="text-center">No se han encontrado propiedades con el criterio indicado</h3>';

		if(count !== '0'){

			resultsHtml = require('../building-results/index.jade')({
				count: count,
				model: model,
				actualPage: actualPage
			});
		}

		if(actualPage === 0){
			$(qSelector).html( resultsHtml );
		}else{
			$('#resultsItem-loadMore').remove(); // Remover botón cargar más
			$(qSelector).append( resultsHtml );
		}
	}

	constructor(){
	}

}

module.exports = new BuildingResults()