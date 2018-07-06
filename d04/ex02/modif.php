<?php
  if (empty($_POST[login]) || empty($_POST[oldpw]) || empty($_POST[newpw]) || $_POST[submit] != OK)
  {
    echo "ERROR\n";
    exit();
  }
  if (file_exists("../private/passwd"))
  {
    $users = unserialize(file_get_contents("../private/passwd"));
    foreach ($users as $key => $value)
      if ($value[login] == $_POST[login] && hash(whirlpool, $_POST[oldpw]) == $value[passwd])
      {
          $users[$key][passwd] = hash(whirlpool, $_POST[newpw]);
          file_put_contents("../private/passwd", serialize($users));
          echo "OK\n";
          exit();
      }
    }
  echo "ERROR\n";
  exit();
?>