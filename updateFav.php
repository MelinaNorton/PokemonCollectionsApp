<?php
session_start();
include_once 'include_db.php';
doDB();
//make sure that the method is a post (to change the favorites value)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

//authenticate
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not authenticated."]);
    exit;
}
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['id'])) {
    echo json_encode(["success" => false, "message" => "Missing Pokemon ID."]);
    exit;
}

//sanitize input
$pokemon_id = mysqli_real_escape_string($mysqli, $input['id']);
$user_id    = mysqli_real_escape_string($mysqli, $_SESSION['user_id']);

//run SQL query to update the favorites value based on the current value
$update_sql = "UPDATE UserPokemons 
               SET is_favorite = IF(is_favorite = 1, 0, 1)
               WHERE id = '$pokemon_id' AND user_id = '$user_id'";

if(mysqli_query($mysqli, $update_sql)){
    echo json_encode(["success" => true, "message" => "Favorite status updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating favorite status: " . mysqli_error($mysqli)]);
}
?>
