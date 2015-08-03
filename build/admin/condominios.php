<?php

class CondominiumsAdmin
{
	private $json_a;
	private $info_c = array();
	private $update = false;
	private $keyupdate = false;
	private $inputs = array('title', 'comments', 'facebook', 'codes', 'video_url');
	
	function __construct()
	{
		$string = file_get_contents("../config/condominiums.json");

		$this->json_a = json_decode($string, true);
		$this->info_c['id'] = ''.count($this->json_a); // Default code
	}
	/**
	*  Actualizar orden de los condominios
	**/
	public function updateOrder(){
		foreach ($_POST['items'] as $key => $item) {
			$this->json_a[ $item['id'] ]['order'] = $item['order'];
		}
		$this->saveInFile();
	}

	public function manageCondominiums(){
		// Search by update
		foreach ($this->json_a as $key => $c) {
			if(isset($_POST['id']) and $c['id'] === $_POST['id']){
				$this->keyupdate = $key;
				$this->update = true;
				$this->info_c = $c;
			}
		}

		// Set info
		foreach ($this->inputs as $iname) {
			if( !empty($_POST[ $iname ])){
				$this->info_c[ $iname ] = $_POST[ $iname ];
			}
		}

		$this->info_c['link'] = '/condominio/' . htmlentities( $this->info_c['title'] );

		if($this->update){
			$this->json_a = array_replace($this->json_a, array($this->keyupdate => $this->info_c));
		}else{
			array_push($this->json_a, $this->info_c);
		}
		$this->saveInFile();
	}

	private function saveInFile(){
		// Save file
		$fp = fopen('../config/condominiums.json', 'w');
		fwrite($fp, json_encode($this->json_a));
		fclose($fp);

		echo 'Información guardada correctamente';
	}

}

$c = new CondominiumsAdmin();

if(isset($_POST['process']) and $_POST['process'] === 'changeOrder'){
	$c->updateOrder();
}else{
	$c->manageCondominiums();
}
