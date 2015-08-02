import wysiwyg from 'wysiwyg.js'
import template from './quienesSomos.jade'

export default class QuienesSomosAdmin {
  constructor() {
    $('#root-container').html( template() );
    $('#qs_content').wysiwyg({
      toolbar: 'top',
    });
  }
}
