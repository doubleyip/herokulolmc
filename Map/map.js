console.log('Version -0.284');

var GlobalAccountID;
var GloalSummonerID;
var GlobalRecentMatches = [];
// bad idea^ 

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

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/sumSearch?name=' + SUMMONER_NAME,
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                //getting data from json into local variables
                GloalSummonerID = json.id;
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
                //createButton(function () { multiMatchLookUp(GlobalRecentMatches); }, 'Multi-Map');
                //createButton(function () { multiCSGraph(GlobalRecentMatches); }, 'Multi-CS-Graph');
                SumonnerProfile(GloalSummonerID);
                MultiKDA(GlobalRecentMatches);
                //multiCSGraph(GlobalRecentMatches);
                //billy's holy grail
                var x = document.querySelectorAll("p#table_match_id_1, p#table_match_id_2, p#table_match_id_3, p#table_match_id_4, p#table_match_id_5");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].innerHTML = GlobalRecentMatches[i];
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
    var curSummonerID = GloalSummonerID;
    var tier_str = 'empty';
    var rank_str = 'empty';
    var wins_str = 'empty';
    var losses_str = 'empty';
    var leaguePoints_str = 'empty';
    var hotstreak_str = 'empty';




    $.ajax({
            url: 'change this for summoner id  ---/lol/league/v3/leagues/by-summoner/{summonerId}' + curSummonerID,
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (json) {
                // loop through json to find summoner using summoner id
                 for (i = 0; i < json.entries.length; i++) {
                    if (json.entries[i].playerOrTeamId == curSummonerID) {
                        tier_str = json.tier;
                        rank_str = json.entries[i].rank;
                        wins_str = json.entries[i].wins;
                        losses_str = json.entries[i].losses;
                        leaguePoints_str = json.entries[i].leaguePoints;
                        hotstreak_str = 'empty';
                        
                        break;
                    }
                }
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "error.html";
                //alert("error getting Summoner data!1");
            }
        });

}

function CreeperScoreThingy(matchnumber) {
    // a random match number to test : 2654536966
    var currID = GlobalAccountID;
    var participantID = 'empty';
    $.ajax({
        url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + matchnumber,
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
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data!");
        },
        async: false
    });




    $.ajax({
        url: 'https://nodejslolmc1.herokuapp.com/getTimeline?rmatch=' + matchnumber,
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (json) {

            try {
                console.log(json.frames[5].participantFrames[participantID].minionsKilled);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                console.log(json.frames[10].participantFrames[participantID].minionsKilled);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                console.log(json.frames[15].participantFrames[participantID].minionsKilled);

            }
            catch (e) {
                if (e) {
                    console.log("error");

                }
            }
            try {
                console.log(json.frames[20].participantFrames[participantID].minionsKilled);

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
        async: false
    });
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
                    if(m<5 && json.participantIdentities[i].player.accountId == currID)
                    {
                        x[m].innerHTML = json.participants[i].stats.kills;
                        y[m].innerHTML = json.participants[i].stats.deaths;
                        z[m].innerHTML = json.participants[i].stats.assists;
                        game[m].innerHTML = json.gameMode + " (NORMAL DRAFT)";
                        duration[m].innerHTML = Math.floor(json.gameDuration/60) + " min " + json.gameDuration % 60 + " secs";
                        time[m].innerHTML = timeDifference(Date.now(), json.gameCreation);
                        if(json.participants[i].stats.win){

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
            async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

        labelsTemp.push(m + 1);
        dataTempArray.push(dataTemp);
    }

    dataKills /= 20;
    dataDeaths /= 20;
    dataAssists /= 20;


    var data = [{
        value: winCount,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Win"
    }, {
        value: lossCount,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Loss"
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
            async: false // This line is the holy grail of our project/
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
            async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

        //console.log(participantID);
        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/getTimeline?rmatch=' + RECENT_MATCHES[m],
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
            async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

    }
    displaymap(multiKill_coordsRED, multiKill_coordsBLUE);
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

    var profileIcon = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/';
    var itemIcon1 = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon2= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon3 = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon4 = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon5 = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var itemIcon6 = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
    var item1 = 'empty';
    var item2 = 'empty';
    var item3 = 'empty';
    var item4 = 'empty';
    var item5 = 'empty';
    var item6 = 'empty';

    if (MATCH_NUM !== "") {

        $.ajax({
            url: 'https://nodejslolmc1.herokuapp.com/recentSearch?rmatch=' + MATCH_NUM,
            type: 'GET',
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
                        itemIcon1 += json.participants[i].stats.item1;
                        itemIcon2 += json.participants[i].stats.item2;
                        itemIcon3 += json.participants[i].stats.item3;
                        itemIcon4 += json.participants[i].stats.item4;
                        itemIcon5 += json.participants[i].stats.item5;
                        itemIcon6 += json.participants[i].stats.item6;
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("error getting Summoner data!");
                console.log("error in match lookup :( ");
            },
            ///////////////////////////////////////////////////////////
            async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });

        profileIcon += '.png';
        itemIcon1 += '.png';
        itemIcon2 += '.png';
        itemIcon3 += '.png';
        itemIcon4 += '.png';
        itemIcon5 += '.png';
        itemIcon6 += '.png';
        console.log(profileIcon);

        // !! this is where you change the get element by id to match with new html.
        /*
        var img = document.createElement("img");
        img.src = profileIcon;
        var profileIconImage = document.getElementById("ramin_icon");
        profileIconImage.appendChild(img);  
        var img = document.createElement("img");
        img.src = itemIcon1;
        var profileIconImage = document.getElementById("item1");
        profileIconImage.appendChild(img);
        var img = document.createElement("img");
        img.src = itemIcon2;
        var profileIconImage = document.getElementById("item2");
        profileIconImage.appendChild(img);
        var img = document.createElement("img");
        img.src = itemIcon3;
        var profileIconImage = document.getElementById("item3");
        profileIconImage.appendChild(img);
        var img = document.createElement("img");
        img.src = itemIcon4;
        var profileIconImage = document.getElementById("item4");
        profileIconImage.appendChild(img);
        var img = document.createElement("img");
        img.src = itemIcon5;
        var profileIconImage = document.getElementById("item5");
        profileIconImage.appendChild(img);
        var img = document.createElement("img");
        img.src = itemIcon6;
        var profileIconImage = document.getElementById("item6");
        profileIconImage.appendChild(img);
        */
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
            async: false // This line is the holy grail of our project/
            //and still a SUPER DUPER BAD idea ¯\_(ツ)_/¯ //////////////
            ///////////////////////////////////////////////////////////
        });
        displaymap(Kill_coordsRED, Kill_coordsBLUE);
    }
    else { }
}




function displaymap(Kill_coordsRED, Kill_coordsBLUE) {
    //console.log(Kill_coords);


    var cordsRED = Kill_coordsRED,
        cordsBLUE = Kill_coordsBLUE,

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

    svg = d3.select("#map").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

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
