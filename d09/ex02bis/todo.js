
var container = $( "#ft_list" );
$( "#add_todo" ).on( "click", toggle );
$( document ).ready( recoverTodoList );
$( "#cancelinfo" ).on( "click", function() {	
	$( "#inputinfo" ).val( "" );
 	toggle();
	});
$( "#submitinfo" ).on( "click", function() {
	toggle();
	addTodo( $( "#inputinfo" ).val() );
	$( "#inputinfo" ).val( "" );
	});

function toggle() {
	$( "#ft_list" ).toggle();
	$( "#todoinfo" ).toggle();
}

function addTodo( info ) { 
	if ( !info ) return;
	prependDiv( info );
	addCookie( "todolist", info );
}

function prependDiv( info ) {
	var new_div = $( "<div></div>" ).addClass( "todo" ).text( info );	
	new_div.on( "click", function() { custom_remove( new_div ) } );
	container.prepend( new_div );	
}	

function getExpire( exdays ) {
	var d = new Date();
	d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
	var expires = "expires=" + d.toUTCString();
	return( expires );
}

function addCookie( cname, info ) {
	infostr = getCookie( cname );
	if ( infostr == "" )
		infostr = encodeURIComponent( info );
	else
		infostr = infostr + "|" + encodeURIComponent( info );
		document.cookie = cname + "=" + infostr + "; " + getExpire( 1 / 24 );
}

function getCookie( cname ) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for( var i = 0; i < ca.length; i++ ) {
    var c = ca[i];
    while ( c.charAt( 0 ) == ' ' ) c = ( c.substring( 1 ) );
    if ( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return "";
}

function checkCookie() {
    var  todolist = getCookie( "todolist" );
    if ( todolist != "" ) {
		return true;
    }
   	else {
		return false;
    }
}

function getDecodedTab( cname ) {
	tab = getCookie( cname ).split( '|' );
	var i = 0;
	while( tab[i] ) {
		tab[i] = decodeURIComponent( tab[i] );
		i++;
	}
	return( tab );
}

function recoverTodoList() {
	todotab = getDecodedTab( "todolist" );
	var arrayLength = todotab.length;
	for( var i = 0; i < arrayLength; i++ )
		if ( todotab[i] != "" )
			prependDiv( todotab[i] );
}


function custom_remove( el ) {
	if ( !confirm( "Really delete this ?" ) )
		return;
	todolist = getCookie( "" ).split( '|' );
	tab = getDecodedTab( "todolist" );
	var text = el.text();
	var info = "";
	var index = 0;
	while( tab[index] ) {
		if ( text != tab[index] ) {
		if ( info != "" )
			info += "|";
			info += encodeURIComponent( tab[index] );
		}
		else
			text = "";
		index++;
	}
	document.cookie = "todolist" + "=" + info + "; " + getExpire( 1 / 24 );
	el.remove();
}
