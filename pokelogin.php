<?php
session_start();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="PokeApp.css">
    <link rel="stylesheet" href="NavBar.css">
</head>
<body>
    <div id="navbar">
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            fetch('../navbar.html')
                  .then(response => response.text())
                  .then(data => {
                      document.getElementById('navbar').innerHTML = data;
                  });
          });
      </script>
    </div>
    <div class="intro">
    <img style="width:30px; height:30px;" src="chickorita.png">
    <p><strong>Enter Login Credentials: </strong></p>
    </div>
    <p style="font-style: italic">For Demo Purposes: exampleUser & PokemonIsCool!</p>
    <form id="Login" action="processlogin.php" method="get">
        Username: <input type="text" name="username" id="username" value=""><br>
        Password: <input type="password" name="password" id="password" value=""><br>
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token, ENT_QUOTES, 'UTF-8'); ?>">
        <input type="submit" value="Login">
    </form>
</body>