<?php
  if (empty($_POST[login]) || empty($_POST[passwd]) || $_POST[submit] != OK)
  {
    echo "ERROR\n";
    exit();
  }
  if (!file_exists("../private"))
    mkdir("../private");
  else if (file_exists("../private/passwd"))
  {
    $users = unserialize(file_get_contents("../private/passwd"));
    foreach ($users as $userdata)
      foreach ($userdata as $key => $value)
        if ($key == "login" && $value == $_POST[login])
        {
          echo "ERROR\n";
          exit();
        }
  }
  $_POST[passwd] = hash(whirlpool, $_POST[passwd]);
  $users[] = $data = array("login"=>$_POST[login], "passwd"=>$_POST[passwd]);
  file_put_contents("../private/passwd", serialize($users));
  echo "OK\n";
?>