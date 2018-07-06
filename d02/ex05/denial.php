#!/usr/bin/php
<?php
function csv_to_obj($filename)
{
	if(!file_exists($filename) || !is_readable($filename))
		return array(FALSE, FALSE);
	$tt = file_get_contents($filename);
	if ($tt == FALSE)
		return array(FALSE, FALSE);
	$contents = explode("\n", $tt);
	$header = str_getcsv($contents[0], ";");
	$i = 1;
	$data = array();
	while ($i < count($contents) - 1)
	{
		$data[] = array_combine($header, array_slice(str_getcsv($contents[$i], ";"), 0, 5));
		$i++;
	}
	return array($header, $data);
}
function myeval($str, $myheader = array())
{
	foreach ($myheader as $h)
		eval("global $" . $h . ";");
	eval($str);
}
function create_globals($header)
{
	myeval("$" . $h . " = [];", $header);
}
function fill_globals($header, $row, $indexBy)
{
	if (!array_key_exists($indexBy, $row))
		return (FALSE);
	foreach ($header as $h)
		myeval("$" . $h . "['" . $row[$indexBy] . "'] = '" . $row[$h] . "';", $header);
	return (TRUE);
}
if ($argc > 2)
{
	list($header, $data) = csv_to_obj($argv[1]);
	if ($header != FALSE)
	{
		foreach ($data as $elem)
		{
			if (fill_globals($header, $elem, $argv[2]) == FALSE)
				exit(0);
		}
		print("Enter your command: ");
		while (($in = fgets(STDIN)) != FALSE)
		{
			myeval($in, $header);
			print("Enter your command: ");
		}
		echo("\n");
	}
}
?>