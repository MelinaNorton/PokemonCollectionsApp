var t;
var type = 'name';
var query = 'happiny';
// Start a timeout with each keypress
function startSearch() {
   if (t) window.clearTimeout(t);
   t = window.setTimeout("pokeSearch()",1000);
}

//code connecting the nav buttons to their appropriate page, as well as appending the necessary click functions to the pokemon cards
$(document).ready(function(){
    $(".collectionbtn").on("click", function(){
        window.location.href = "mycollection.html";
    });
    $(".home").on("click", function(){
        window.location.href = "PokeApp.html";
    });
    $(".statsbtn").on("click", function(){
        window.location.href = "stats.html";
    });
    $(".aboutbtn").on("click", function(){
        window.location.href = "about.html";
    });
    $(".usabilitybtn").on("click", function(){
        window.location.href = "usabilityTestResults.html";
    });
    $("#results").on("click", ".card", function(){
        console.log('card clicked!');
        var $pName = $(this).find(".pname").text();
        var $pType = $(this).find(".ptype").text();
        var $pId = $(this).find(".pid").text();
        var $pImg = $(this).find(".pimg").attr("src");
        addPokemon($pName, $pType, $pId, $pImg);
    })
    $("#results").on("dblclick", ".card", function(){
        var $curr = $(this, {style:"width:300px, height:300px"});
        $(".list").remove();
        var $ul = $("<ul>", {class:"list"});
        var $li = $("<li>");
        $li.append($curr);
        $ul.append($li);
        $("#results").append($ul);
    })
;})

//Function to access the Ajax request code with the appropriate queries/categories based on the search-bar input
function pokeSearch(){
    query = $("#pokesearch").val();
    console.log(type);
    console.log(query);
    getPokemon(query, type);
}

//Function to change the category being filtered from the category-dropdown button on the homepage
function changeType(newType){
    type = newType;
}

//Function connecting the dropdown buttons to the appropriate changeType function/parameter 
$("#name").on("click", function() { changeType("name"); });
$("#type").on("click", function() { changeType("type"); });
$("#id").on("click", function() { changeType("id"); });

//Starting the search
obj=$("#pokesearch");
obj.keydown(startSearch);




  
