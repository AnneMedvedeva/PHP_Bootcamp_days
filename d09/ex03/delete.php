<?php

if ( empty( $_POST ) || empty( $_POST['id'] ) || $_POST['id'] !== "delete" ) {
	echo( "post data issue" );
	return;
}

if ( ( $handle = fopen("list.csv", "r") ) !== FALSE ) {
    while ( ( $csvdata = fgetcsv( $handle, 0, ";", '"', "\\") ) !== FALSE ) {      
		$data[$csvdata[0]] = $csvdata[1];
	}
	fclose( $handle );
	unset( $data[$_POST['elemid']] );
}

$handle = fopen( 'list.csv', 'w');
foreach ( $data as $key => $value ) {
	fputcsv( $handle, [ $key, $value ], ';', '"' );
}
fclose( $handle );
echo( "Todo deleted" );
return;

?>
