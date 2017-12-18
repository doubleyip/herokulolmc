console.log('Version -0.2');
// Simon when you get to this, heres a easy example how to recieve the username, password, and data.
//https://stackoverflow.com/questions/45105992/node-js-send-data-to-backend-with-ajax

var GlobalAccountID;
var GlobalRecentMatches = [];

//Get account id for username
function summonerLookUp(SUMMONER_NAME) {
    console.log("in summoner lookup");
    //var SUMMONER_NAME = "";
    //SUMMONER_NAME = $("#userName").val();
    var acc_ID = "";
    //var API_KEY = "";
    //API_KEY = $("#API-Key").val();

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/sumSearch?name=' + SUMMONER_NAME,
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //getting data from json into local variables
                summonerID = json.id;
                var accountID = json.accountId;
                //setting global paramter
                GlobalAccountID = accountID;
                acc_ID = GlobalAccountID;
                return acc_ID;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!");
            },
            async: false
            // SUPER DUPER BAD idea but ¯\_(ツ)_/¯
        });
    } else { }
    return acc_ID;
}

function createButton(func, match_n) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = match_n;

    button.onclick = function () {
        console.log("plz work");
        func();
        //matchLookUp(match_n);
        console.log("test");
        //summonerLookUp("test");
    };
    document.body.appendChild(button);
    //button.
    //document.body.
}

function printStuff(name) {
    //var API_KEY = "";
    //API_KEY = $("#API-Key").val();
    console.log("calling summoner lookup");
    var Account_ID = summonerLookUp(name);
    if (Account_ID !== "") {
        //console.log("hi");
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/matchSearch?id=' + GlobalAccountID,
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                var matches = json.matches;
                //This is where we print the last 5 matches the summoner played
                matches.forEach(function (match, i) {
                    //if(i<5){
                    GlobalRecentMatches.push(match.gameId);
                    createButton(function () { save(match.gameId); }, match.gameId);
                    console.log("He1");
                    }

                })
                
                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!1");
            }
        });
    } else { }

}
function save(match){
	console.log("Do stuff with " + match);
}

