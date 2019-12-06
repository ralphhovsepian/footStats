const lastFifteen = document.getElementById('last-fifteen');
const nextFive = document.getElementById('next-five');
const nextFifteen = document.getElementById('next-fifteen');
const gamesInfo = document.getElementById('gamesInfo');

async function showGames(url) {

    while (gamesInfo.firstChild) {
        gamesInfo.removeChild(gamesInfo.firstChild)
      }
      
    let response = await fetch(url);
    let data = await response.json();

    data.events.forEach(event => {
        console.log(event);

        let matchInfo = document.createElement('div');
        matchInfo.id = 'matchInfo';
        gamesInfo.appendChild(matchInfo);
        let pElement = document.createElement('p');
        pElement.id = event.idEvent;
        pElement.innerHTML = `${event.strEvent} <br><br><br>${event.dateEvent}`;
        matchInfo.appendChild(pElement);
    });
    
}


lastFifteen.onclick = () => console.log(showGames('https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328'));
nextFive.onclick = () => console.log(showGames('https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133602'));
nextFifteen.onclick = () => console.log(showGames('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'));