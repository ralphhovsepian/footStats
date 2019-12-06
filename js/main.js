

const lastFifteen = document.getElementById('last-fifteen');
const nextFive = document.getElementById('next-five');
const nextFifteen = document.getElementById('next-fifteen');
const gamesInfo = document.getElementById('gamesInfo');



async function showGames(choiceId, url) {
    
    activeLink();

    while (gamesInfo.firstChild) {
        gamesInfo.removeChild(gamesInfo.firstChild)
      }
      
    let response = await fetch(url);
    let data = await response.json();

    data.events.forEach(event => {
        console.log(event);

        let colsm = document.createElement('div');
        colsm.className = 'col-sm-6';
        gamesInfo.appendChild(colsm);

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card bg-white text-dark';
        colsm.appendChild(cardDiv);
        
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardDiv.appendChild(cardBody);

        let heading = document.createElement('h5');
        heading.className = 'card-title';
        heading.innerHTML = event.strEvent;

        let paragraph = document.createElement('p');
        paragraph.className = 'card-text';
        paragraph.innerHTML = event.dateEvent;

        let moreInfo = document.createElement('a');
        moreInfo.className = 'btn btn-primary';
        moreInfo.href = '#';
        moreInfo.innerText  = 'More info';
        cardBody.append(heading, paragraph, moreInfo);
    });
    
}

//changes active link class when clicked
 const activeLink = () => {

    const activeLink = document.getElementsByClassName('nav-link');
    for (let i = 0; i < activeLink.length; i++) {
        activeLink[i].addEventListener("click", function() {
          let current = document.getElementsByClassName("active");
          current[0].className = 'nav-link';
          this.className += " active";
        });
      }

 }


lastFifteen.onclick = () => console.log(showGames(lastFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328'));
nextFive.onclick = () => console.log(showGames(nextFive.id, 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133602'));
nextFifteen.onclick = () => console.log(showGames(nextFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'));