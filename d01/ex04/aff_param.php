#!/usr/bin/php
<?php
foreach ($argv as $elem)
{
	if ($elem != $argv[0])
	{
		echo $elem;
		echo"\n";
	}
}
?>