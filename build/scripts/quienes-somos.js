var url = '/quienes-somos-editable.html'
var textid = 'qs_content';
var $textarea = $('#'+textid);
var $qs = $('#save-qs')

var saveContent = function(){
	$.ajax({
		
	});
};

(function(){
	$.ajax({
		url: url ,
		beforeSend: function (){
			$textarea.text('Cargando... por favor espere')
		},
		success: function(data){
			$textarea.text(data); // Set html
			AlloyEditor.editable(textid); // alloy editor start
		},
		error: function(xhr, msg, thr){
			console.log(msg, thr)
			alert("Error al editar por favor contacte a soporte");
		}
	});

	$qs.on('click', function(){
		// Save new content
		var html = $('.cke_editable').html();
		$.ajax({
			url: '/admin/editqs.php',
			success: function(){
				alert('contenido actualizado');
			},
			method: 'post',
			data: {
				html: html
			},
			error: function(xhr, msg, thr){
				alert('error en la petición');
				console.error('error: ', msg, thr)
			}
		})
	})
})()
