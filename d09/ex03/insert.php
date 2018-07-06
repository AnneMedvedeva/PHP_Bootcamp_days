<?php

if ( empty( $_POST ) || empty( $_POST['id'] ) || $_POST['id'] !== "insert" || empty( $_POST['infos'] ) )
	return;

$topid = -1;
if (($handle = fopen("list.csv", "r+")) !== FALSE) {
	while (($data = fgetcsv($handle, 0, ";", '"', "\\" )) !== FALSE) {
		if ( $data[0] > $topid )
			$topid = $data[0];
	}
	if ( fputcsv( $handle, [ $topid + 1, $_POST['infos'] ], ';', '"' ) === FALSE ) {
		echo ( "fputcsv return false" );
		return;
	}
	if ( fclose($handle) === FALSE ) {
		echo ( "fclose return false" );
		return;
	}
}

echo ( "Todo inserted" );

?>
