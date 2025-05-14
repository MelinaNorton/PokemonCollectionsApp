<?php
session_start();
//handle request-type contingencies
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}
header('Content-Type: application/json');

if(!isset($_SESSION['collection'])){
    $_SESSION['collection'] = [
        1 => ['pname' => 'pikachu', 'ptype' => 'electric', 'pid' => '25', 'pimg' => 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png']
    ];
}

//start the connection to the DB
include_once 'include_db.php';
doDB();
$request_method = $_SERVER['REQUEST_METHOD'];

//handle the different request types
switch($request_method){
    case 'GET':
        $favoritesFilter = "";
        if (isset($_GET['favorites']) && $_GET['favorites'] === "true") {
            $favoritesFilter = " AND is_favorite = 1";
        }

        if (isset($_SESSION['user_id'])) {
            $user_id_safe = mysqli_real_escape_string($mysqli, $_SESSION['user_id']);
        } else {
            echo json_encode(["error" => true, "message" => "User not authenticated."]);
            exit;
        }

        $get_pokemon_sql = "SELECT id, pokename, poke_img, poketype, pokedex_id, is_favorite 
                    FROM UserPokemons 
                    WHERE user_id = '$user_id_safe' $favoritesFilter";

        $result = mysqli_query($mysqli, $get_pokemon_sql);
        
        $pokemonArray = [];
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $pokemonArray[] = $row;
            }
            echo json_encode($pokemonArray);
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Error fetching data: ' . mysqli_error($mysqli)
            ]);
        }
        break;
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            error_log("Input received: " . print_r($input, true));
            
            if (isset($input['name']) && isset($input['type'])) {
                $clean_name = mysqli_real_escape_string($mysqli, $input['name']);
                $clean_type = mysqli_real_escape_string($mysqli, $input['type']);
                $clean_id   = mysqli_real_escape_string($mysqli, $input['id']);
                $clean_img  = mysqli_real_escape_string($mysqli, $input['image']);
                
                $is_favorite = !empty($input['is_favorite']) && $input['is_favorite'] ? 1 : 0;
                
                if (isset($_SESSION['user_id'])) {
                    $clean_user_id = mysqli_real_escape_string($mysqli, $_SESSION['user_id']);
                } else {
                    echo json_encode(["success" => false, "message" => "User not authenticated."]);
                    exit;
                }
                
                $add_poke_sql = "INSERT INTO UserPokemons (pokename, poketype, pokedex_id, poke_img, is_favorite, user_id) 
                                 VALUES ('" . $clean_name . "', '" . $clean_type . "', '" . $clean_id . "', '" . $clean_img . "', '$is_favorite', '" . $clean_user_id . "')";
                $add_poke_res = mysqli_query($mysqli, $add_poke_sql);
                if (!$add_poke_res) {
                    echo json_encode([
                        "success" => false,
                        "message" => "SQL error: " . mysqli_error($mysqli),
                        "query" => $add_poke_sql 
                    ]);
                    exit;
                }                
            
                $new_pokemon_id = mysqli_insert_id($mysqli);
                $input['new_id'] = $new_pokemon_id;
            
                echo json_encode(["success" => true, "collection" => $input]);
            } else {
                echo json_encode(["success" => false, "message" => "Missing required fields"]);
            }        
            break;        
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['poke_id'])) {
            $poke_id = mysqli_real_escape_string($mysqli, $input['poke_id']);
        } else {
            echo json_encode(["success" => false, "message" => "No Pokemon id provided."]);
            exit;
        }
        if (isset($_SESSION['user_id'])) {
            $clean_user_id = mysqli_real_escape_string($mysqli, $_SESSION['user_id']);
        } else {
            echo json_encode(["success" => false, "message" => "User not authenticated."]);
            exit;
        }
        
        $delete_sql = "DELETE FROM UserPokemons WHERE id = '$poke_id' AND user_id = '$clean_user_id'";
        if(mysqli_query($mysqli, $delete_sql)){
            echo json_encode(["success" => true, "message" => "Pokemon deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete: " . mysqli_error($mysqli)]);
        }
        break;
        
    default:
        echo json_encode(["success" => false, "message" => "Invalid request method."]);
        break;
}
?>
