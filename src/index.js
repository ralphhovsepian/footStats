import Swal from 'sweetalert2';
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');
import {showTeams, upcomingGames} from './searchTeams';

 //global variables
 const home = document.querySelectorAll('.home');
 const lastFifteen = document.querySelectorAll('.last-fifteen');
 const nextFifteen = document.querySelectorAll('.next-fifteen');
 const searchForm = document.getElementById('searchForm');
 const searchInput = document.getElementById('searchInput');
 const gamesInfo = document.getElementById('gamesInfo');


 //show previous and upcoming games
async function showGames(choiceId, url) {

  document.getElementById('homeInfo').style.display = 'none';
  document.getElementById('selectLeague').style.display = 'block';

  activeLink();

 teamInfo.style.display = 'none';
 teams.style.display = 'none';
 gamesInfo.style.display = 'block';


  //removes info when other option is clicked
  while (gamesInfo.firstChild) {
      gamesInfo.removeChild(gamesInfo.firstChild);
    }
    const selectLeague = document.getElementById('selectLeague');
      let selected = selectLeague[selectLeague.selectedIndex].id;
      url += selected;
      console.log(url);
  
  //fetching data from API and display
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
      moreInfo.id = event.idEvent;
      moreInfo.href = '#';
      moreInfo.innerText  = 'More info';
      cardBody.append(heading, paragraph, moreInfo);

      
      //When user clicks more details, it shows match details
      moreInfo.onclick = () => {

          //if it's last 15 games it shows match results otherwise just details
          if(lastFifteen.className == 'nav-link active') {

        Swal.fire({
          title: `<strong>${event.strEvent}</strong>`,
          html:
            `<b>Score: ${event.intHomeScore}:${event.intAwayScore}</b><br><br>
             <p>Home scorers: <b>${event.strHomeGoalDetails}</b></p>
              <p>Away scorers: <b>${event.strAwayGoalDetails}</b></p>
            `,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-times"></i> Close',
          confirmButtonAriaLabel: 'Close',
        })

          } else {
              Swal.fire({
                  title: `<strong>${event.strEvent}</strong>`,
                  html:
                    `<b>League: ${event.strLeague}</b><br><br>
                     <p>Time: <b>${event.strTime}</b></p>
                    `,
                  showCloseButton: true,
                  focusConfirm: false,
                  confirmButtonText:
                    '<i class="fa fa-times"></i> Close',
                  confirmButtonAriaLabel: 'Close',
                })
          }
      }



  });

}


//changes active link class when clicked
export const activeLink = () => {

  const activeLink = document.getElementsByClassName('nav-link');
  for (let i = 0; i < activeLink.length; i++) {
      activeLink[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = 'nav-link';
        this.className += " active";
      });
    }

}


 //on form submit, show searched relevant teams
searchForm.onsubmit = () => console.log(showTeams());

//on click, show last 15, next 5, next 15 games
lastFifteen[0].onclick = () => console.log(showGames(lastFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id='));
lastFifteen[1].onclick = () => console.log(showGames(lastFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id='));
nextFifteen[0].onclick = () => console.log(showGames(nextFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id='));
nextFifteen[1].onclick = () => console.log(showGames(nextFifteen.id, 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id='));
home[0].onclick = () => { homeDisplay(); };
home[1].onclick = () => { homeDisplay(); };

 //when click home button, nothing shows
 const homeDisplay = () => {
  document.getElementById('teamInfo').style.display = 'none';
  document.getElementById('teams').style.display = 'none';
  document.getElementById('homeInfo').style.display = 'block';
  document.getElementById('selectLeague').style.display = 'none';
  
  while (gamesInfo.firstChild) {
      gamesInfo.removeChild(gamesInfo.firstChild);
    }
 }