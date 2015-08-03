<?php
	if(isset($_POST['html'])){
		$fichero = '../quienes-somos-editable.html';
		// Añade una nueva persona al fichero
		$html = $_POST['html'];
		// Escribe el contenido al fichero
		file_put_contents($fichero, $html);
	}else{
		die("Petición no valida");
	}
	