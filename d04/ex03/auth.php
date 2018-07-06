<?php
  function auth($login, $passwd)
  {
    $users = unserialize(file_get_contents("../private/passwd"));
    foreach ($users as $key => $value)
      if ($value[login] == $login && hash(whirlpool, $passwd) == $value[passwd])
        return (true);
    return (false);
  }
?>