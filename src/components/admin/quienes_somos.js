import template from './quienesSomos.jade'
import React from 'react'
	
export default class QuienesSomosAdmin {
  constructor() {
    $('#root-container').html( template() );
	AlloyEditor.editable('qs_content');
  }
}