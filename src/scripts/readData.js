const papaparse = require('papaparse');


class Team {
    constructor(place, name, gameScores, totalScore) {
        this.place = place;
        this.name = name;
        this.gameScore = gameScores;
        this.totalScore = totalScore;
        this.normalizeGameScore();
    }
    normalizeGameScore() {
        for (let i = 0; i < this.gameScore.length; i++) {
            if (this.gameScore[i] == '') {
                this.gameScore[i] = '0';
            }
        } 
    }
}

async function readData(filePath) {
    let reader = new FileReader();
    const rawData = await fs.promises.readFile(filePath, "utf8");
    const parsedData = await parseData(rawData);
    return parsedData;

}

async function parseData(input) {
    return new Promise((resolve, reject) => {
        papaparse.parse(input, {
            complete: function(results) {
                return resolve(results);
            }
        })
    })
}

function getTeamResults(teamData) {
    let team = {
        place: teamData[0],
        name: teamData[1],
        gameScores: teamData.slice(2, -1),
        totalScore: teamData[teamData.length - 1],
    };
    return team;
}

const main = async () => {
    const seasonData = await readData("resources/1-2.season.csv");
    let teamData = getTeamResults(seasonData.data[1]);

    let team = new Team(teamData.place, teamData.name, teamData.gameScores, teamData.totalScore);
    const jsonData = JSON.stringify(team, null, 2);
    fs.writeFile(`team_${team.name}.json`, jsonData, (err) => {
        if (err) {
            throw err;
        }
    })
    console.log(team);
}


function ajaxRequest(url) { 
	
	let httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener("load", ajaxRequest);

	httpRequest.open('GET', url);
	httpRequest.onreadystatechange = function()	{
		if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            console.log("made it");
            console.log(httpRequest.responseText);
			return httpRequest.responseText;				
		}
	}
	httpRequest.send();
	}

//main();
ajaxRequest("resources/1-2.season.csv");