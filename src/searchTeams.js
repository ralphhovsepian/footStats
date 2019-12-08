
//search teams
export async function showTeams() {

    
const teams = document.getElementById('teams');
const teamInfo = document.getElementById('teamInfo');
const teamLogo = document.getElementById('teamBadge');
const teamTitle = document.getElementById('teamName');
const league = document.getElementById('league');
const stadium = document.getElementById('stadium');
const jersey = document.getElementById('jersey');


    //hide homeinfo, last,next games info and show searched teams
      teams.style.display = 'flex';
      gamesInfo.style.display = 'none';
      teamInfo.style.display = 'none';
      document.getElementById('homeInfo').style.display = 'none';
      
      //removes info when other value is searched
      while (teams.firstChild) {
        teams.removeChild(teams.firstChild);
      }
  
      //fetch teams data and display
      let search = searchInput.value;
      let response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${search}`);
      let data = await response.json();
  
      data.teams.forEach(team => {
  
  
        let teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.id = team.idTeam;
        teams.appendChild(teamDiv);
  
        let teamName = document.createElement('h3');
        teamName.innerHTML = team.strTeam;
  
        let teamBadge = document.createElement('img');
        
        //if there is no logo, display alternative image
        if(team.strTeamBadge === null) {
          teamBadge.src = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';
        } else {
          teamBadge.src = team.strTeamBadge;
        }
        
        teamDiv.append(teamName, teamBadge);
  
          teamDiv.onclick = () => {
            teamInfo.style.display = 'flex';
            console.log(team.strTeamBadge);
            teams.style.display = 'none';
            teamLogo.src = team.strTeamBadge;
  
            teamTitle.innerText = team.strTeam;
            league.innerHTML = `<b>League:</b><br>${team.strLeague}`;
            stadium.innerHTML = `<b>League:</b><br>${team.strStadium}`;
            jersey.src = team.strTeamJersey;

            upcomingGames(team.idTeam);
          }
  
      });
  
   }
  
  

   export async function upcomingGames(teamId) {
     
    document.getElementById('homeInfo').style.display = 'none';
    const scheduleBody = document.getElementById('scheduleBody');

    //removes info when other value is searched
    while (scheduleBody.firstChild) {
      scheduleBody.removeChild(scheduleBody.firstChild);
    }
        let response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamId}`);
        let data = await response.json();
        console.log(data);


        data.events.forEach(data => {

          const tr = document.createElement('tr');
          scheduleBody.appendChild(tr);
  
          const th = document.createElement('th');
          th.scope = 'row';
          th.innerHTML = `<i class="fa fa-calendar" aria-hidden="true"></i> ${data.dateEvent}`;
          tr.appendChild(th);


          const scheduleInfo = [data.strHomeTeam, data.strAwayTeam, data.strTime];

          for(let i= 0; i < scheduleInfo.length; i++) {
            const td = document.createElement('td');
            td.innerHTML = scheduleInfo[i];
            tr.appendChild(td); 
          }

        });
       


   }
  
