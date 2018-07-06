
var container = document.getElementById( "ft_list" );
document.getElementById( "add_todo" ).onclick = addTodo;
document.body.onload = recoverTodoList;

function addTodo() {
	var info = prompt( "Please, enter new todo informations." );
	if ( !info || info == "" )
		return;
	prependDiv( info );
	addCookie( "todolist", info );
}

function prependDiv( info ) {
	var new_div = document.createElement( "div" );
	new_div.className = "todo";
	new_div.innerHTML = info;
	new_div.addEventListener( "click", function() { custom_remove( new_div ) } , false );
	container.insertBefore( new_div, container.firstChild );
	
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
	if ( !confirm( "really delete this ?" ) )
		return;
	todolist = getCookie( "" ).split( '|' );
	tab = getDecodedTab( "todolist" );
	var index = tab.indexOf( el.innerHTML );
	if (index > -1) {
	    tab.splice(index, 1);
	}
	var info = "";
	index = 0;
	while( tab[index] ) {
		if ( info != "" )
			info += "|";
		info += encodeURIComponent( tab[index] );
		index++;
	}
	document.cookie = "todolist" + "=" + info + "; " + getExpire( 1 / 24 );
	el.remove();
}
