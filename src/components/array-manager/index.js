class ArrayManager{
  /**
  *  Remover elementos vacios de un array tomando en cuenta las mismas condiciones que empty PHP
  **/
 removeEmptys( arrayElements ){
    $.each(arrayElements, (index, elem) =>{
       if(!!!elem && elem !== false){
          arrayElements.splice( index , 1 );
       }
    });
    return arrayElements;
  }

  joinArray( arrayElements, separator ){
    arrayElements = this.removeEmptys(arrayElements);
    return arrayElements.join(separator);
  }

  constructor() {

  }

}

module.exports = new ArrayManager();
