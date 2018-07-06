#!/usr/bin/php
<?php
while(1)
{
    echo "Enter a number: ";
    $line = trim(fgets(STDIN));
    if (feof(STDIN) == TRUE)
        exit();
    if (!is_numeric($line))
    {
        echo "'$line' is not a number\n";
    }
    else
    {
        echo 'The number '.$line.' is ';
        if ($line % 2 == 0)
        {
            echo  "even\n";
        }
        else
        {
            echo "odd\n";
        }
    }
}