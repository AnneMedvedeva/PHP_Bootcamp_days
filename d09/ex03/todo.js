
var container = $( "#ft_list" );
$( "#add_todo" ).on( "click", addTodo );
$( document ).ready( recoverTodoList );
var tab;

function addTodo( infos ) { 
	var infos = prompt( "Please enter the new todo informations" );
	if ( !infos ) return;
	var prev_id = container.find( ":first-child" ).attr( 'id' );
	var id = ( prev_id === "add_todo" ? 0 : parseInt( prev_id ) + 1 );
	prependDiv( infos, id );
	$.ajax({
		type 	:	'POST',
		url		:	'insert.php',
		data	:	{ 'id' : 'insert', 'infos' : infos },
		dataType:	'html',
		cache	:	false,
		success :	function( result ) {
						if ( result !== "Todo inserted" )
							console.log( "result : " + result );
					},
		error	:	function ( xhr, ajaxOptions, thrownError ) {
				    	console.log( thrownError + xhr.status + xhr.responseText );
					},		
	});
}

function prependDiv( infos, id ) {
	var new_div = $( "<div></div>" ).addClass( "todo" ).text( infos );	
	new_div.on( "click", function() { custom_remove( new_div ) } );
	new_div.attr( 'id', id );
	container.prepend( new_div );	
}	

function recoverTodoList() {
	$.ajax({
	    type 	:	'POST',
	    url		:	'select.php',
		data	:	'id=recover',
		dataType:	'json',
	    cache	:	false,
	    success :	function( array ) {
						for ( var k in array ){
						    if (typeof array[k] !== 'function') {
						         prependDiv( array[k], k );
						     }
						}
    	    		},
		error	:	function ( xhr, ajaxOptions, thrownError ) {
				    	console.log( thrownError + xhr.status + xhr.responseText );
					},		
	});
}


function custom_remove( el ) {
	if ( !confirm( "Really delete this ?" ) )
		return;
	$.ajax({
		type	:	'POST',
		url		:	'delete.php',
		data	:	{ 'id' : 'delete', 'elemid': el.attr( 'id' ) },
		dataType:	'html',
		cache	:	'false',
		success	:	function( result ) {
						if ( result !== "Todo deleted" )
							console.log( "result : " + result );
					},
		error	:	function ( xhr, ajaxOptions, thrownError ) {
				    	console.log( thrownError + xhr.status + xhr.responseText );
					},		
	});
	el.remove();
}
