console.log('Version -0.286');

var GlobalAccountID;
var GlobalSummonerID;
var GlobalRecentMatches = [];
// bad idea^ 

function logIn(username,password) {

	$.ajax({
            url: 'checklogin.php',
            type: 'GET',
            data: {userID: username
            },
            success: function (data) {
				if(password==data){
					localStorage.LoginStatus=true;
					localStorage.loggedInAs=username;
				alert("Succesfully Logged In");
				}
				else
					alert("Incorrect Username or Password");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = "error.html";
                alert("Incorrect Username or Password");
            },
            //async: false
            // SUPER DUPER BAD idea but ¯\_(ツ)_/¯
        });
}

function register(username,email,password,cpassword){
	if(password==cpassword){
	$.ajax({
            url: 'testinsert.php',
            type: 'POST',
            data: {userID: username, pass: password, email: email
            },
            success: function (data) {
				alert("Registered for LoLMC, Please Log In");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = "error.html";
                alert("Oops something went wrong! Please try again");
            },
            //async: false
            // SUPER DUPER BAD idea but ¯\_(ツ)_/¯
	});
	}
	else
		alert("Please confirm the correct password");
}

function logOut() {
	localStorage.LoginStatus=false;
}

function saveMatch(fieldnum){
	username=localStorage.loggedInAs;
	var match=GlobalRecentMatches[fieldnum];
	if(localStorage.LoginStatus){
	$.ajax({
            url: 'savegame.php',
            type: 'POST',
            data: {userID: username, matchID: match
            },
            success: function (data) {
				if (data==1){
				alert("Match Saved");
				}
				else
				{
				alert("You reached your limit of saved games");
				}
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = "error.html";
                alert("Oops something went wrong! Please try again");
            },
            //async: false
            // SUPER DUPER BAD idea but ¯\_(ツ)_/¯
	});
	}
	else
		alert("Please Log In to save a match");
	
}

function timeDifference(current, previous) {
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
         return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
         return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
         return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function processUser() {
    var parameters = window.location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    l = unescape(temp[1]);
    //temp = parameters[1].split("=");
    //p = unescape(temp[1]);
    document.getElementById("user_Name").innerHTML = l;
    //document.getElementById("pass").innerHTML = p;
    return l;
    //printStuff(l);
}

//function that fetchs the users id
function summonerLookUp(SUMMONER_NAME) {
    console.log("in summoner lookup");
    //var SUMMONER_NAME = "";
    //SUMMONER_NAME = $("#userName").val();
    var acc_ID = "";
    //var API_KEY = "";
    //API_KEY = $("#API-Key").val();

    var summonerLevel = '1';

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/sumSearch?name=' + SUMMONER_NAME,
            type: 'GET',
	    crossDomain: true,
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
                GlobalSummonerID = json.id;
                summonerLevel = json.summonerLevel;
		document.getElementById('sumLevel').innerHTML="Level "+summonerLevel;
                return acc_ID;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!");
            },
            //async: false
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


// This is the only function we call, This calls summoner lookup and lists the recent matches of a user
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
            crossDomain: true,
	    dataType: 'json',
            data: {
            },
            success: function (json) {
                var matches = json.matches;
                //This is where we print the last 5 matches the summoner played
                matches.forEach(function (match, i) {
                    //if(i<5){
                    GlobalRecentMatches.push(match.gameId);
                    //createButton(function () { matchLookUp(match.gameId); }, match.gameId);
                    //console.log("He1");
                    //}
                })
                // var list = $('<ul>');
                // $('body').append(list);
                // matches.forEach(function(match, i){
                //     if(i<5){
                //      list.append($('<li>').text(`Match${i+1}:`).append($('<a>').attr('href', match.gameId).text(`${match.gameId}`)));
                //     }
                // })   
                createButton(function () { multiMatchLookUp(GlobalRecentMatches); }, 'Multi-Map');
                //createButton(function () { matchLookUp(match.gameId); }, 'Match Details');
                //createButton(function () { multiCSGraph(GlobalRecentMatches); }, 'Multi-CS-Graph');
                SummonerProfile(GlobalSummonerID);
                MultiKDA(GlobalRecentMatches);
		//multiMatchLookUp(GlobalRecentMatches);
                createButton(function () { printCreepMaps(GlobalRecentMatches); }, 'Print All Creeps');
                
                /*for(i=0; i< 5; i++){
                    console.log(GlobalRecentMatches[i]);
                    matchLookUp(GlobalRecentMatches[i]);
                    console.log('success');
                }*/
                //multiCSGraph(GlobalRecentMatches);
                //billy's holy grail
                var x = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].innerHTML = GlobalRecentMatches[i];
                    matchLookUp(GlobalRecentMatches[i]);
                    //CreeperScoreThingy(GlobalRecentMatches[i]);
                    console.log('success');
                }
                //hehehehehehhe
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!1");
            }
        });
    } else { }

}

function SummonerProfile(summoner_id){
    var curSummonerID = GlobalSummonerID;
    console.log(GlobalSummonerID);
    var tier_str = 'empty';
    var rank_str = 'empty';
    var wins_str = 'empty';
    var losses_str = 'empty';
    var leaguePoints_str = 'empty';
    var hotstreak_str = 'empty';
    var source = 'https://raw.githubusercontent.com/billyeo/LoL-Map-Checker.github.io/master/tier-icons/tier-icons/';




    $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/getLeague?id=' + curSummonerID,
            type: 'GET',
            crossDomain: true,
	    dataType: 'json',
            data: {
            },
            success: function (json) {
                console.log(json);
                // loop through json to find summoner using summoner id
                    
                        tier_str = json[0].tier;
                        rank_str = json[0].rank;
                        wins_str = json[0].wins;
                        losses_str = json[0].losses;
                        leaguePoints_str = json[0].leaguePoints;
                        hotstreak_str = 'empty';
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!1");
            },
        async: false
        });
    document.getElementById('tier').innerHTML = tier_str;
    document.getElementById('division').innerHTML = rank_str;
    document.getElementById('lp').innerHTML = leaguePoints_str;
    document.getElementById('winNum').innerHTML = wins_str;
    document.getElementById('lossNum').innerHTML = losses_str;

    var lower_tier = tier_str.toLowerCase();
    var lower_div = rank_str.toLowerCase();
    document.getElementById('summoner-tier-image').src = source + lower_tier + '_' + lower_div + '.png';

}

function printCreepMaps(){
    //console.log("harro");
    var match_id = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
    for(x =0; x< match_id.length; x++){
        CreeperScoreThingy(match_id[x].innerHTML, x+1);
        //console.log("me printinggg");
    }
    //console.log("popp");
}

function CreeperScoreThingy(matchnumber, match_tab) {
    // a random match number to test : 2654536966
    var currID = GlobalAccountID;
    var participantID = 'empty';

    var labelsTemp = [];
    var dataTempArray = [];
    var data = 'empty';;

    $.ajax({
        url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + matchnumber,
        type: 'GET',
        crossDomain: true,
	dataType: 'json',
        data: {
        },
        success: function (json) {

            // find participant id
            for (i = 0; i < json.participantIdentities.length; i++) {
                if (json.participantIdentities[i].player.accountId == currID) {
                    participantID = json.participantIdentities[i].participantId;
                    //console.log(participantID);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data!");
        },
        //async: false
    });




    $.ajax({
        url: 'https://nodejslolmc1.herokuapp.com/getTimeline?rmatch=' + matchnumber,
        type: 'GET',
	crossDomain: true,
        dataType: 'json',
        data: {
        },
        success: function (json) {

            try {
                data = json.frames[5].participantFrames[participantID].minionsKilled;
                console.log(data);
                labelsTemp.push(5);
                dataTempArray.push(data);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                data = json.frames[10].participantFrames[participantID].minionsKilled - data;
                console.log(data);
                labelsTemp.push(10);
                dataTempArray.push(data);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                data = json.frames[15].participantFrames[participantID].minionsKilled - data;
                console.log(data);
                labelsTemp.push(15);
                dataTempArray.push(data);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                data = json.frames[20].participantFrames[participantID].minionsKilled - data;
                console.log(data);
                labelsTemp.push(20);
                dataTempArray.push(data);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data!");
        },
        //async: false
    });

    var chartData = {
        labels: labelsTemp,
        datasets: [
            {
                fillColor: "#79D1CF",
                strokeColor: "#79D1CF",
                data: dataTempArray
            }
        ]
    };

    
    
    //var match_id = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
    
    //for(z= 0 ; z< match_id.length;z++){
    //    if(match_id[z].innerHTML == matchnumber){
    //var w = z+1;
    //var match_name = 'match_creep_' + w;
    var match_name = 'match_creep_' + match_tab;
    //console.log(match_name);
    var ctx = document.getElementById(match_name).getContext("2d");
    //console.log("creepee");
    var myLine = new Chart(ctx).Line(chartData, {
        showTooltips: false,
        onAnimationComplete: function () {

            var ctx = this.chart.ctx;
            ctx.font = this.scale.font;
            ctx.fillStyle = this.scale.textColor
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            this.datasets.forEach(function (dataset) {
                dataset.points.forEach(function (points) {
                    ctx.fillText(points.value, points.x, points.y - 10);
                });
            })
        }
        });
        //}
   
    //} 


}

function MultiKDA(RECENT_MATCHES) {
    console.log("Entered MultiKDA");
    var currID = GlobalAccountID;
    var dataKills = 0;
    var dataDeaths = 0;
    var dataAssists = 0;
    var winCount = 0;
    var lossCount = 0;

    var labelsTemp = [];
    var dataTempArray = [];
    var dataTemp = 0;

    var w =0;
    var win = document.querySelectorAll("#outcome_1, #outcome_2, #outcome_3, #outcome_4, #outcome_5");
    var game = document.querySelectorAll("#queue_1, #queue_2, #queue_3, #queue_4, #queue_5");
    var duration = document.querySelectorAll("#duration_1, #duration_2, #duration_3, #duration_4, #duration_5");
    var time = document.querySelectorAll("#date_1, #date_2, #date_3, #date_4, #date_5");
    var x = document.querySelectorAll("#kills_1, #kills_2, #kills_3, #kills_4, #kills_5");
    var y = document.querySelectorAll("#deaths_1, #deaths_2, #deaths_3, #deaths_4, #deaths_5");
    var z = document.querySelectorAll("#assists_1, #assists_2, #assists_3, #assists_4, #assists_5");

    var match_id = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");


    for (m = 0; m < RECENT_MATCHES.length; m++) {
        var participantID = 'empty';
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + RECENT_MATCHES[m],
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            data: {
            },
            success: function (json) {

                // find participant id
                for (i = 0; i < json.participantIdentities.length; i++) {
                    if (json.participantIdentities[i].player.accountId == currID) {
                        participantID = json.participantIdentities[i].participantId;
                        //console.log(participantID);
                    }
                    if(m<5 && json.participantIdentities[i].player.accountId == currID)
                    {
                        x[m].innerHTML = json.participants[i].stats.kills;
                        y[m].innerHTML = json.participants[i].stats.deaths;
                        z[m].innerHTML = json.participants[i].stats.assists;
                        game[m].innerHTML = json.gameMode + " (NORMAL DRAFT)";
                        duration[m].innerHTML = Math.floor(json.gameDuration/60) + " min " + json.gameDuration % 60 + " secs";
                        time[m].innerHTML = timeDifference(Date.now(), json.gameCreation);
                        if(json.participants[i].stats.win && m <5){

                            win[m].innerHTML = "WIN";
                        }
                        else 
                        {
                            win[m].innerHTML = "LOSS";
                        }
                    }    


                }
                for (i = 0; i < json.participants.length; i++) {
                    if (json.participants[i].participantId == participantID) {
                        dataKills += json.participants[i].stats.kills;
                        dataDeaths += json.participants[i].stats.deaths;
                        dataAssists += json.participants[i].stats.assists;

                        if (json.participants[i].stats.win) {
                            winCount++;
                        }
                        else {
                            lossCount++;
                        }

                    }
                }


                for (i = 0; i < json.participants.length; i++) {
                    if (json.participants[i].participantId == participantID) {
                        dataTemp = json.participants[i].stats.totalMinionsKilled;
                        //console.log(dataTemp);
                    }


                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("We got an error in multikda but shhhh");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

        labelsTemp.push(m + 1);
        dataTempArray.push(dataTemp);
    }

    dataKills /= 20;
    dataDeaths /= 20;
    dataAssists /= 20;

    // HERE HERE HERE again
    var win_percent = parseInt(winCount/20*100);
    //
    var kda_rate = (dataKills + dataAssists) / dataDeaths;
    kda_rate = Math.round(100*kda_rate)/100;
    document.getElementById('avg_win').innerHTML = (win_percent);
    document.getElementById('avg_kda').innerHTML = (kda_rate +  ':' + '1');
    //
    var sum_minions_killed =0;
    for(z=0; z< dataTempArray.length;z++){
        sum_minions_killed += dataTempArray[z];
    }
    sum_minions_killed /= 20;
    document.getElementById('avg_cs').innerHTML = (sum_minions_killed);
    //CreeperScoreThingy(2667756393);
    //

    var data = [{
        value: winCount,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Win",
        labelColor: 'white',
        labelFontSize: '16'
    }, {
        value: lossCount,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Loss",
        labelColor: 'white',
        labelFontSize: '16'
    }];

    var ctx = document.getElementById("winlossChart").getContext("2d");



    var myNewChart = new Chart(ctx).Pie(data);
    console.log('end of print pie');

    var optionsPie = {
        tooltipEvents: [],
        showTooltips: true,
        onAnimationComplete: function () {
            this.showTooltip(this.segments, true);
        },
        tooltipTemplate: "<%= label %> - <%= value %>"
    };

    var kdadata = [{
        value: dataDeaths,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Deaths",
        labelColor: 'white',
        labelFontSize: '16'
    }, {
        value: dataKills,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Kills",
        labelColor: 'white',
        labelFontSize: '16'
    }, {
        value: dataAssists,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Assists",
        labelColor: 'white',
        labelFontSize: '16'
    }];

    var ctx2 = document.getElementById("kdaChart").getContext("2d");



    var myNewChart2 = new Chart(ctx2).Pie(kdadata, optionsPie);


    var chartData = {
        labels: labelsTemp,
        datasets: [
            {
                fillColor: "#79D1CF",
                strokeColor: "#79D1CF",
                data: dataTempArray
            }
        ]
    };

    var ctx = document.getElementById("myChart1").getContext("2d");
    var myLine = new Chart(ctx).Line(chartData, {
        showTooltips: false,
        onAnimationComplete: function () {

            var ctx = this.chart.ctx;
            ctx.font = this.scale.font;
            ctx.fillStyle = this.scale.textColor
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            this.datasets.forEach(function (dataset) {
                dataset.points.forEach(function (points) {
                    ctx.fillText(points.value, points.x, points.y - 10);
                });
            })
        }
    });
}

/*
function multiCSGraph(RECENT_MATCHES) {
    console.log("Entered multiCSGraph");
    var currID = GlobalAccountID;
    var labelsTemp = [];
    var dataTempArray = [];
    var dataTemp = 0;
    for (m = 0; m < RECENT_MATCHES.length; m++) {
        var participantID = 'empty';
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + RECENT_MATCHES[m],
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                // find participant id
                for (i = 0; i < json.participantIdentities.length; i++) {
                    if (json.participantIdentities[i].player.accountId == currID) {
                        participantID = json.participantIdentities[i].participantId;
                        //console.log(participantID);
                    }
                }
                for (i = 0; i < json.participants.length; i++) {
                    if (json.participants[i].participantId == participantID) {
                        dataTemp = json.participants[i].stats.totalMinionsKilled;
                        //console.log(dataTemp);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("We got an error in multicsgraph but shhhh");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });
        labelsTemp.push(m + 1);
        dataTempArray.push(dataTemp);
    }
    var chartData = {
        labels: labelsTemp,
        datasets: [
            {
                fillColor: "#79D1CF",
                strokeColor: "#79D1CF",
                data: dataTempArray
            }
        ]
    };
    var ctx = document.getElementById("myChart1").getContext("2d");
    var myLine = new Chart(ctx).Line(chartData, {
        showTooltips: false,
        onAnimationComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = this.scale.font;
            ctx.fillStyle = this.scale.textColor
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            this.datasets.forEach(function (dataset) {
                dataset.points.forEach(function (points) {
                    ctx.fillText(points.value, points.x, points.y - 10);
                });
            })
        }
    });
}
*/
function multiMatchLookUp(RECENT_MATCHES) {
    console.log("Entered multiMatchLookUp");
    var multiKill_coordsRED = [];
    var multiKill_coordsBLUE = [];

    var currID = GlobalAccountID;
    for (m = 0; m < RECENT_MATCHES.length; m++) {
        var participantID = 'empty';
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + RECENT_MATCHES[m],
            type: 'GET',
	    crossDomain: true,
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //Loop to search for a Champion kill, then store its coordinate
                for (i = 0; i < json.participantIdentities.length; i++) {
                    if (json.participantIdentities[i].player.accountId == currID) {
                        participantID = json.participantIdentities[i].participantId;
                        console.log(participantID);
                    }


                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in multimatch lookup :( part 1");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

        //console.log(participantID);
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/getTimeline?rmatch=' + RECENT_MATCHES[m],
            type: 'GET',
	    crossDomain: true,
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //Loop to search for a Champion kill, then store its coordinate
                for (i = 0; i < json.frames.length; i++) {
                    for (j = 0; j < json.frames[i].events.length; j++) {
                        if (json.frames[i].events[j].type == 'CHAMPION_KILL' && json.frames[i].events[j].victimId == participantID) {
                            //console.log(json.frames[i].events[j].position.x);
                            var x = json.frames[i].events[j].position.x;
                            //console.log(x);
                            var y = json.frames[i].events[j].position.y;
                            if (participantID > 4) {
                                multiKill_coordsBLUE.push([x, y]);
                            }
                            else {
                                multiKill_coordsRED.push([x, y]);
                            }

                        }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in multimatch lookup :( part 2");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

    }
    displaymap(multiKill_coordsRED, multiKill_coordsBLUE, 0);
}



// This function calls display map, and plots a specific matchs kill coords
function matchLookUp(MATCH_NUM) {
    //var SUMMONER_NAME = "";
    //SUMMONER_NAME = $("#userName").val();

    //var API_KEY = "RGAPI-c16c2668-0913-4123-9416-113f700d30f0";
    var Kill_coordsRED = [];
    var Kill_coordsBLUE = [];
    var participantID = 'empty';
    var currID = GlobalAccountID;

    var profileIcon = 'https://ddragon.leagueoflegends.com/cdn/7.24.1/img/profileicon/';
    var itemIcon1 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon2= 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon3 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon4 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon5 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon6 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var trinketIcon = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var ChampIcon = 'https://ddragon.leagueoflegends.com/cdn/7.24.1/img/champion/';
    //var ChampIcon_1 = 'https://ddragon.leagueoflegends.com/cdn/7.24.1/img/champion/';
    var matchBG = 'httpss://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    var errorPNG = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/0.png';
    var ss1 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/';
    var ss2 = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/';
    var item1 = 'empty';
    var item2 = 'empty';
    var item3 = 'empty';
    var item4 = 'empty';
    var item5 = 'empty';
    var item6 = 'empty';
    var item0 = 'empty';
    var champIconNum = 'empty';

    var match_id = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
    var championItem = document.querySelectorAll("#item_1, #item_2, #item_3, #item_4, #item_5");
    if (MATCH_NUM !== "") {

        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + MATCH_NUM,
            type: 'GET',
	    crossDomain: true,
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //Loop to search for a player id, profile icon, item icons
                for (i = 0; i < json.participantIdentities.length; i++) {
                    if (json.participantIdentities[i].player.accountId == currID) {
                        participantID = json.participantIdentities[i].participantId;
                        profileIcon += json.participantIdentities[i].player.profileIcon;
                        console.log(participantID);
                    }
                }

                 for (i=0; i<json.participants.length; i++)
                {
                    if (json.participants[i].participantId == participantID)
                    {
                        itemIcon1 += json.participants[i].stats.item0;
                        itemIcon2 += json.participants[i].stats.item1;
                        itemIcon3 += json.participants[i].stats.item2;
                        itemIcon4 += json.participants[i].stats.item3;
                        itemIcon5 += json.participants[i].stats.item4;
                        itemIcon6 += json.participants[i].stats.item5;
                        trinketIcon += json.participants[i].stats.item6;
                        champIconNum = json.participants[i].championId;
                    }
                    //console.log('check here');
                    console.log(champIconNum);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in match lookup :( ");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

/*
        // example html https://na1.api.riotgames.com/lol/static-data/v3/champions/117?locale=en_US
        $.ajax({
            //url: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json',
            url: 'https://nodejslolmc1.herokuapp.com/getChamppic',
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                var images = Object.keys(json.data).map(function (key) {
                    if(json.data[key].key == champIconNum){
                            ChampIcon += json.data[key].name;
                            matchBG += json.data[key].name;
                            //console.log(ChampIcon);
                        }
                });
                
                for (i = 0; i < json.data.length; i++) {
                    if (json.data[i].key == champIconNum) {
                        ChampIcon += json.data[i].id;
                    }
                    console.log('hey dudue');
                    //console.log(ChampIcon);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in match lookup zz :( ");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });
*/

        var champname = findchampid(champIconNum);
        matchBG += champname;
        ChampIcon += champname;

        profileIcon += '.png';
        itemIcon1 += '.png';
        itemIcon2 += '.png';
        itemIcon3 += '.png';
        itemIcon4 += '.png';
        itemIcon5 += '.png';
        itemIcon6 += '.png';
        trinketIcon += '.png';
        ChampIcon += '.png';
        matchBG += '_0.jpg'
        ss1 += '.png';
        ss2 += '.png';

        //console.log(profileIcon);
        //console.log(matchBG);
        //document.getElementById('summoner_icon').style.backgroundImage = "url(profileIcon)";
        document.getElementById('summoner_icon').src = profileIcon;
        document.getElementById('summoner_page_header').style.backgroundImage = 'url('+ matchBG +')';

        // !! this is where you change the get element by id to match with new html.
        /*
        var img = document.createElement("img");
        img.src = profileIcon;
        var profileIconImage = document.getElementById("ramin_icon");
        profileIconImage.appendChild(img);  
        var img = document.createElement("img");
        */

        for(i=0; i< match_id.length;i++){
            //console.log(match_id[i].innerHTML);
            if(match_id[i].innerHTML == MATCH_NUM){
                var w = i+1;
                var x1 = 'item_' + w + '_1';
                var x2 = 'item_' + w + '_2';
                var x3 = 'item_' + w + '_3';
                var x4 = 'item_' + w + '_4';
                var x5 = 'item_' + w + '_5';
                var x6 = 'item_' + w + '_6';
                var x7 = 'trinket_' + w;

                var tableImage = 'match_' + w;
                var champ_1 = 'champion_image_' + w;
                //console.log(itemIcon1);
                //document.getElementById(champ_1).src = sum_of_this;
                document.getElementById(champ_1).src = ChampIcon;


                if(itemIcon1 != errorPNG)
                {document.getElementById(x1).src  = itemIcon1;}
                if(itemIcon2 != errorPNG)
                {document.getElementById(x2).src  = itemIcon2;}
                if(itemIcon3 != errorPNG)
                {document.getElementById(x3).src  = itemIcon3;}
                if(itemIcon4 != errorPNG)
                {document.getElementById(x4).src  = itemIcon4;}
                if(itemIcon5 != errorPNG)
                {document.getElementById(x5).src  = itemIcon5;}
                if(itemIcon6 != errorPNG)
                {document.getElementById(x6).src  = itemIcon6;}

                document.getElementById(x7).src = trinketIcon;
                document.getElementById(tableImage).style.backgroundImage = 'url('+ matchBG +')';
                //document.getElementById('summoner_icon').src = profileIcon;
            }
        }
        console.log(participantID);
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/getTimeline?rmatch=' + MATCH_NUM,
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //Loop to search for a Champion kill, then store its coordinate
                for (i = 0; i < json.frames.length; i++) {
                    for (j = 0; j < json.frames[i].events.length; j++) {
                        if (json.frames[i].events[j].type == 'CHAMPION_KILL' && json.frames[i].events[j].victimId == participantID) {
                            //console.log(json.frames[i].events[j].position.x);
                            var x = json.frames[i].events[j].position.x;
                            //console.log(x);
                            var y = json.frames[i].events[j].position.y;
                            if (participantID > 4) {
                                Kill_coordsBLUE.push([x, y]);
                            }
                            else {
                                Kill_coordsRED.push([x, y]);
                            }
                        }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in match lookup :( part 2");
            },
            ///////////////////////////////////////////////////////////
            //async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });
        displaymap(Kill_coordsRED, Kill_coordsBLUE, MATCH_NUM);
        //CreeperScoreThingy(MATCH_NUM);
    }
    else { }
}




function displaymap(Kill_coordsRED, Kill_coordsBLUE, MATCH_NUM) {
    //console.log(Kill_coords);

    var match_id = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
    var cordsRED = Kill_coordsBLUE,
        cordsBLUE = Kill_coordsRED,

        // Domain for the current Summoner's Rift on the match history website's mini-map

        domain = {
            min: { x: -570, y: -420 },
            max: { x: 15220, y: 14980 }
        },
        width = 512,
        height = 512,
        bg = "http://opgg-static.akamaized.net/images/maps/11.png",
        xScale, yScale, svg;

    color = d3.scale.linear()
        .domain([0, 3])
        .range(["white", "steelblue"])
        .interpolate(d3.interpolateLab);

    xScale = d3.scale.linear()
        .domain([domain.min.x, domain.max.x])
        .range([0, width]);

    yScale = d3.scale.linear()
        .domain([domain.min.y, domain.max.y])
        .range([height, 0]);


    if(MATCH_NUM == 0){
    svg = d3.select("#map").append("svg:svg")
        .attr("width", width)
        .attr("height", height);
        
    }
    else {
        for(i=0; i< match_id.length;i++){
        
            if(match_id[i].innerHTML == MATCH_NUM){
                var w = i + 1;
                var map = '#map_' + w;
                svg = d3.select(map).append("svg:svg")
                .attr("width", width)
                .attr("height", height);

            }
        }
    }

    svg.append('image')
        .attr('xlink:href', bg)
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', width)
        .attr('height', height);



    svg.append('svg:g').selectAll("circle")
        .data(cordsBLUE)
        .enter().append("svg:circle")
        .attr('cx', function (d) { return xScale(d[0]) })
        .attr('cy', function (d) { return yScale(d[1]) })
        .attr('r', 5)
        .attr('class', 'kills')
        .style("fill", "blue")
        .style("opacity", 0.7)
        .style("stroke", "black");



    svg.append('svg:g').selectAll("circle")
        .data(cordsRED)
        .enter().append("svg:circle")
        .attr('cx', function (d) { return xScale(d[0]) })
        .attr('cy', function (d) { return yScale(d[1]) })
        .attr('r', 5)
        .attr('class', 'kills')
        .style("fill", "red")
        .style("opacity", 0.7)
        .style("stroke", "black");


}


function findchampid(CHAMP_KEY){
    var champkeys = {
        "1": "Annie",
        "2": "Olaf",
        "3": "Galio",
        "4": "TwistedFate",
        "5": "XinZhao",
        "6": "Urgot",
        "7": "Leblanc",
        "8": "Vladimir",
        "9": "Fiddlesticks",
        "10": "Kayle",
        "11": "MasterYi",
        "12": "Alistar",
        "13": "Ryze",
        "14": "Sion",
        "15": "Sivir",
        "16": "Soraka",
        "17": "Teemo",
        "18": "Tristana",
        "19": "Warwick",
        "20": "Nunu",
        "21": "MissFortune",
        "22": "Ashe",
        "23": "Tryndamere",
        "24": "Jax",
        "25": "Morgana",
        "26": "Zilean",
        "27": "Singed",
        "28": "Evelynn",
        "29": "Twitch",
        "30": "Karthus",
        "31": "Chogath",
        "32": "Amumu",
        "33": "Rammus",
        "34": "Anivia",
        "35": "Shaco",
        "36": "DrMundo",
        "37": "Sona",
        "38": "Kassadin",
        "39": "Irelia",
        "40": "Janna",
        "41": "Gangplank",
        "42": "Corki",
        "43": "Karma",
        "44": "Taric",
        "45": "Veigar",
        "48": "Trundle",
        "50": "Swain",
        "51": "Caitlyn",
        "53": "Blitzcrank",
        "54": "Malphite",
        "55": "Katarina",
        "56": "Nocturne",
        "57": "Maokai",
        "58": "Renekton",
        "59": "JarvanIV",
        "60": "Elise",
        "61": "Orianna",
        "62": "MonkeyKing",
        "63": "Brand",
        "64": "LeeSin",
        "67": "Vayne",
        "68": "Rumble",
        "69": "Cassiopeia",
        "72": "Skarner",
        "74": "Heimerdinger",
        "75": "Nasus",
        "76": "Nidalee",
        "77": "Udyr",
        "78": "Poppy",
        "79": "Gragas",
        "80": "Pantheon",
        "81": "Ezreal",
        "82": "Mordekaiser",
        "83": "Yorick",
        "84": "Akali",
        "85": "Kennen",
        "86": "Garen",
        "89": "Leona",
        "90": "Malzahar",
        "91": "Talon",
        "92": "Riven",
        "96": "KogMaw",
        "98": "Shen",
        "99": "Lux",
        "101": "Xerath",
        "102": "Shyvana",
        "103": "Ahri",
        "104": "Graves",
        "105": "Fizz",
        "106": "Volibear",
        "107": "Rengar",
        "110": "Varus",
        "111": "Nautilus",
        "112": "Viktor",
        "113": "Sejuani",
        "114": "Fiora",
        "115": "Ziggs",
        "117": "Lulu",
        "119": "Draven",
        "120": "Hecarim",
        "121": "Khazix",
        "122": "Darius",
        "126": "Jayce",
        "127": "Lissandra",
        "131": "Diana",
        "133": "Quinn",
        "134": "Syndra",
        "136": "AurelionSol",
        "141": "Kayn",
        "142": "Zoe",
        "143": "Zyra",
        "150": "Gnar",
        "154": "Zac",
        "157": "Yasuo",
        "161": "Velkoz",
        "163": "Taliyah",
        "164": "Camille",
        "201": "Braum",
        "202": "Jhin",
        "203": "Kindred",
        "222": "Jinx",
        "223": "TahmKench",
        "236": "Lucian",
        "238": "Zed",
        "240": "Kled",
        "245": "Ekko",
        "254": "Vi",
        "266": "Aatrox",
        "267": "Nami",
        "268": "Azir",
        "412": "Thresh",
        "420": "Illaoi",
        "421": "RekSai",
        "427": "Ivern",
        "429": "Kalista",
        "432": "Bard",
        "497": "Rakan",
        "498": "Xayah",
        "516": "Ornn"
    };

    console.log(champkeys);
    console.log(champkeys[CHAMP_KEY]);
    return champkeys[CHAMP_KEY];
}
