<?php

if ( empty( $_POST ) || empty( $_POST['id'] ) || $_POST['id'] !== "recover" )
	return;

if ( ( $handle = fopen( "list.csv", "r" ) ) !== FALSE ) {
    while ( ( $data = fgetcsv( $handle, 0, ";", '"', "\\" ) ) !== FALSE ) {
		$tab[ $data[0] ] = $data[1];
	}
    fclose( $handle );
}

echo ( json_encode( $tab ) );

?>
