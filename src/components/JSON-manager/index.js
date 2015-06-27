global.$ = require('jquery');
class jsonManager{

	getFromStorage(filename){
		return new Promise( (resolve, reject) => {
			if(sessionStorage.getItem(filename) !== null){
				resolve(JSON.parse( sessionStorage.getItem(filename) ));
			}else{
				this.getFromFile(filename)
					.then( (fileContent) => {
						sessionStorage.setItem( filename, JSON.stringify(fileContent) )
						resolve(fileContent);	
					});
			}
		} );
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