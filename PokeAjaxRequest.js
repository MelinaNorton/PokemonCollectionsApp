//Function to be called when no matches were found for a given query, reqturning pokemon of all types/NOT clearing the list
function getAllPokemon(query){
    const settings = {
        async: true,
        crossDomain: true,
        url:  'https://pokemon-hub.p.rapidapi.com/?type=' + query,
        method: 'GET',
        headers: {
            'x-rapidapi-key': '938b59c587mshd450facca2ef9f8p1736dejsn1f2e8e758cfd',
            'x-rapidapi-host': 'pokemon-hub.p.rapidapi.com'
        }
    };
    $.ajax(settings).done(function(response, textStatus, jqXHR){
        console.log(response);
        if(response){
            var $div = $("#results");
            $("#error").remove();
            if (response.data && Array.isArray(response.data)) {
                var $ul = $("<ul>", { class: "list" });
                
                response.data.forEach(function(pokemon) {
                    var $li = $("<li>");
                    var $card = $("<li>", { class : "card"});

                    var $pName = $("<p>", { class : "pname"}).text(pokemon.name);
                    var $pType = $("<p>", { class : "ptype"}).text(pokemon.type);
                    var $pId = $("<p>", { class : "pid"}).text(pokemon.id);
                    var $pImg = $("<img>", {src:pokemon.image, class:"pimg"});
                    $li.append($pName, $pType, $pId, $pImg);
                    $card.append($li);
                    $ul.append($card);
                });
            
                $div.append($ul);
            }
            else{  
            }
        }
    })
}

//function to get pokemon (with a query/ category specified); on failure to match, getAllPokemon is called
function getPokemon(query, type){
    if(type == 'name'){
        const settings = {
            async: true,
            crossDomain: true,
            url:  'https://pokemon-hub.p.rapidapi.com/search?' + type + '=' + query,
            method: 'GET',
            headers: {
                'x-rapidapi-key': '938b59c587mshd450facca2ef9f8p1736dejsn1f2e8e758cfd',
                'x-rapidapi-host': 'pokemon-hub.p.rapidapi.com'
            }
        };
        $.ajax(settings).done(function(response, textStatus, jqXHR){
            console.log(response);
            if(response){
                $(".list").remove();
                $('#error').remove();
                var $div = $("#results");
            
                if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
                    console.log("data recieved!");
                    var $ul = $("<ul>", { class: "list" });
                    response.data.forEach(function(pokemon){
                        var $li = $("<li>");
                        var $card = $("<li>", { class : "card"});
    
                        var $pName = $("<p>", {class : 'pname'}).text(pokemon.name);
                        var $pType = $("<p>", {class : 'ptype'}).text(pokemon.type);
                        var $pId = $("<p>", {class : 'pid'}).text(pokemon.id);
                        var $pImg = $("<img>", {src:pokemon.image, class : 'pimg'})
                        $li.append($pName, $pType, $pId, $pImg);
                        $card.append($li);
                        $ul.append($card);
                    })
                
                    $div.append($ul);
                }
                else{
                    var $msg = $("<p>", {id:'error'}).text("No Results Match Search");
                    $("#results").append($msg);
                    getAllPokemon('water');
                    getAllPokemon('dark');
                    getAllPokemon('flying');
                    getAllPokemon('fire');
                    getAllPokemon('psychic');
                }
            }  
        });
    }   
    else if(type=="type"){
        const settings = {
            async: true,
            crossDomain: true,
            url:  'https://pokemon-hub.p.rapidapi.com/?' + type + '=' + query,
            method: 'GET',
            headers: {
                'x-rapidapi-key': '938b59c587mshd450facca2ef9f8p1736dejsn1f2e8e758cfd',
                'x-rapidapi-host': 'pokemon-hub.p.rapidapi.com'
            }
        };
        $.ajax(settings).done(function(response, textStatus, jqXHR){
            console.log(response);
            $(".list").remove();
            $('#error').remove();
            if(response){
                var $div = $("#results");
            
                if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
                    console.log("data recieved!");
                    var $ul = $("<ul>", { class: "list" });
                    
                    response.data.forEach(function(pokemon) {
                        var $li = $("<li>");
                        var $card = $("<li>", { class : "card"});
    
                        var $pName = $("<p>", { class : "pname"}).text(pokemon.name);
                        var $pType = $("<p>", { class : "ptype"}).text(pokemon.type);
                        var $pId = $("<p>", { class : "pid"}).text(pokemon.id);
                        var $pImg = $("<img>", {src:pokemon.image, class:"pimg"});
                        $li.append($pName, $pType, $pId, $pImg);
                        $card.append($li);
                        $ul.append($card);
                    });
                
                    $div.append($ul);

                }
                else{
                    var $msg = $("<p>", {id:'error'}).text("No Results Match Search");
                    $("#results").append($msg);
                    getAllPokemon('water');
                    getAllPokemon('dark');
                    getAllPokemon('flying');
                    getAllPokemon('fire');
                    getAllPokemon('psychic');
                }
            }  
        });
    }
    else{
        const settings = {
            async: true,
            crossDomain: true,
            url:  'https://pokemon-hub.p.rapidapi.com/' + query,
            method: 'GET',
            headers: {
                'x-rapidapi-key': '938b59c587mshd450facca2ef9f8p1736dejsn1f2e8e758cfd',
                'x-rapidapi-host': 'pokemon-hub.p.rapidapi.com'
            }
        };
        $.ajax(settings).done(function(response, textStatus, jqXHR){
            console.log(response);
            $(".list").remove();
            $('#error').remove();
            if(response){
                var $div = $("#results");
            
                if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
                    console.log("data recieved!");
                    var $ul = $("<ul>", { class: "list" });
                    
                    response.data.forEach(function(pokemon) {
                        var $li = $("<li>");
                        var $card = $("<li>", { class : "card"});
    
                        var $pName = $("<p>", { class : "pname"}).text(pokemon.name);
                        var $pType = $("<p>", { class : "ptype"}).text(pokemon.type);
                        var $pId = $("<p>", { class : "pid"}).text(pokemon.id);
                        var $pImg = $("<img>", {src:pokemon.image, class:"pimg"});
                        $li.append($pName, $pType, $pId, $pImg);
                        $card.append($li);
                        $ul.append($card);
                    });
                
                    $div.append($ul);

                }
                else{
                    var $msg = $("<p>", {id:'error'}).text("No Results Match Search");
                    $("#results").append($msg);
                    getAllPokemon('water');
                    getAllPokemon('dark');
                    getAllPokemon('flying');
                    getAllPokemon('fire');
                    getAllPokemon('psychic');
                }
            }  
        }); 
    }
}

//Function called for mycollection.html/psearch.php that uses GET on the user's collection-data stored in PHP
function getCollection(){
    const settings = {
    async : true,
    crossDomain: true,
    url: 'psearch.php?',
    method: 'GET',
    dataType: 'json'
   }
   $.ajax(settings).done(function(response){
    if(response){
        var $div = $("#collection");
        $("#pokelist").remove();
        var $pokelist = $("<ul>", {id : "pokelist"});
        console.log(response);
        $.each(response, function(key, pokemon){
            console.log("Pokemon object keys:", Object.keys(pokemon));
            var $li = $("<li>");
            var $card = $("<li>", {class:"card"});
            var $pName = $("<p>", {class : "pname"}).text(pokemon.pokename);
            var $pType = $("<p>", {class : "ptype"}).text(pokemon.poketype);
            var $pId = $("<p>", {class : "pid"}).text(pokemon.pokedex_id);
            var $key = pokemon.id;
            var $pImg = $("<img>", {src : pokemon.poke_img, class : "pimg"});
            $li.append($pName, $pType, $pId, $pImg);
            $card.append($li);
            $card.attr('id', $key);
            $pokelist.append($card);
        });
        $div.append($pokelist);
    }
    else{
        console.log("no data retrieved!!");
    }
   });
}

//function to POST a new pokemon's data to the PHP file
function addPokemon($pname, $ptype, $pid, $pimg){
    console.log("adding pokemon...");
    const settings = {
        async : true,
        crossDomain: true,
        url: 'psearch.php?',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'name':$pname,
            'type':$ptype,
            'id':$pid,
            'image':$pimg,
        })
    };
    $.ajax(settings).done(function(response){
        console.log("added a pokemon!");
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(settings.data);
        console.error('Error occurred:', textStatus, errorThrown);
    });
}

//function to DELETE a pokemon's data from the PHP file
function removePokemon($poke_id){
    const settings = {
        async : true,
        crossDomain: true,        
        url: 'psearch.php?',
        method: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({'poke_id':$poke_id})
    };
    $.ajax(settings).done(function(response){
        console.log("deleted a pokemon!");
        window.location.href = "mycollection.html";
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(settings.data);
        console.error('Error occurred:', textStatus, errorThrown);
    });
}

//function to change the is_favorite field in the SQL UserPokemons table based on its current value (flip)
function flipFav($id){
    const settings = {
        async : true,
        crossDomain: true,        
        url: 'updateFav.php?',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({'id':$id})
    };
    $.ajax(settings).done(function(response){
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(settings.data);
        console.error('Error occurred:', textStatus, errorThrown);
    });
}

