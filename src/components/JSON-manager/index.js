global.$ = require('jquery');
class jsonManager{

	getFromStorage(filename){
		let d = new $.Deferred();

		if(sessionStorage.getItem(filename) !== null){
			d.resolve(JSON.parse( sessionStorage.getItem(filename) ));
		}else{
			this.getFromFile(filename)
				.then( (fileContent) => {
					try{
						sessionStorage.setItem( filename, JSON.stringify(fileContent) );
					}catch(error){
						console.log(error);
					}
					d.resolve(fileContent);
				});
		}
		return d;
	}

	getFromFile(filename){
		return $.getJSON(filename);
	}

	/**
	 * Retorna una promesa con el contenido del archivo
	 * @param  {[type]} filename [description]
	 * @return {[type]}          [description]
	 */
	getContent(filename){
		if("undefined" !== typeof sessionStorage){
			return this.getFromStorage(filename);
		}else{
			return this.getFromFile(filename);
		}
	}
}

module.exports = new jsonManager();
