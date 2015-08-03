var condominium = require('../condominiums/index.js');
var tagsInput = require('tags-input');
require('jquery-ui/sortable');

export default class Admin{
	constructor(){
		condominium.getCondominiums().done((data) => {
			 let self = this;
 			 $('body').html( require('../admin/index.jade')({condominiums: data}) ); // load View
			 try{
				 [].forEach.call(document.querySelectorAll('input[type="tags"]'), tagsInput);
			 }catch(e){
				 console.warn(e)
			 }
			 
			
			 // Sort condominiums
			 $('#condominiums-list').sortable({
				 stop: function(event, ui) {
		         self.updateCondominiumsOrder()
				}
			 });
		});
		$(document)
			.on('click', '.condominium-edit', (event) => {
				this.loadCondominium(event);
			})
	}

	updateCondominiumsOrder(){
		let items = $('.condominium-edit').filter( this.hasSorted );
		this.updateAttrOrder();
		let mapItems = $.map(items, this.getCondominiumOrder)
		$.post('/admin/condominios.php', {
			items: mapItems,
			process: 'changeOrder'
		});
	}

	updateAttrOrder(){
		$.each($('.condominium-edit'), (index, el) => {

			let $el = $(el);
			if( $el.data('order') !== index ){
					$el.data('order', index);
			}
		} );
	}

	getCondominiumOrder( elem ){
		 let $elem = $(elem);
		 return {
			 id: $elem.data('id'),
			 order: $elem.data('order')
		 }
	}

	hasSorted( index ){
				let $elem = $(this);
				return (parseInt( $elem.data('order') ) !== index)
	}

	sortById(a, b){
		a = parseInt(a);
		b = parseInt(b);

		if(a.id < a.id){
			return -1;
		}
		else if(a.id > a.id){
			return 1;
		}
		else{
			return 0;
		}
	}

	loadTags(){
		let $tagsInput = $('.tags-input');
		let string_codes = $('[name=codes]').val();
		let codes = string_codes.split(",");
		for(let c of codes){
			$tagsInput.prepend(`<span class="tag" data-tag="${c}">${c}</span>`)
		}
	}

	loadCondominium(event){
		let $target = $(event.target);
		let form = document.getElementById('form-condominium');
		$('[name=title]', form).val( $target.data('title') );
		$('[name=id]', form).val( $target.data('id') );
		$('[name=facebook]', form).val( $target.data('facebook') );
		$('[name=comments]', form).val( $target.data('comments') );
		$('[name=codes]', form).val( $target.data('codes') );
		this.loadTags();
	}
}
