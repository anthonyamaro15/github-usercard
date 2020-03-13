/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const cardParent = document.querySelector(".cards");
let followersArray = [];

function getData() {
  axios
    .get(`https://api.github.com/users/anthonyamaro15`)
    .then(res => {
      console.log(res.data);
      cardParent.appendChild(createCard(res.data));
    })
    .catch(err => console.log(err));
}

function getFollowersData() {
  axios
    .get(`https://api.github.com/users/anthonyamaro15/followers`)
    .then(res => {
      res.data.forEach(item => {
        followersArray.push(item.login);
      });
    })
    .catch(err => console.log(err));
}

getData();
getFollowersData();

setTimeout(() => {
  followersArray.forEach(name => {
    axios
      .get(`https://api.github.com/users/${name}`)
      .then(res => {
        cardParent.appendChild(createCard(res.data));
      })
      .catch(err => console.log(err));
  });
}, 200);

function createCard(obj) {
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const h3 = document.createElement("h3");
  const nameP = document.createElement("p");
  const locationP = document.createElement("p");
  const profileP = document.createElement("p");
  const link = document.createElement("a");
  const followersP = document.createElement("p");
  const followingP = document.createElement("p");
  const bioP = document.createElement("p");

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  h3.classList.add("name");
  nameP.classList.add("username");

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(h3);
  cardInfo.appendChild(nameP);
  cardInfo.appendChild(locationP);
  cardInfo.appendChild(profileP);
  cardInfo.appendChild(link);
  cardInfo.appendChild(followersP);
  cardInfo.appendChild(followingP);
  cardInfo.appendChild(bioP);

  img.src = obj.avatar_url;
  h3.textContent = obj.name;
  nameP.textContent = obj.login;
  locationP.textContent = `Location: ${obj.location}`;
  profileP.textContent = `Profile:`;
  profileP.style.display = "inline-block";
  profileP.style.margin = "0 0.5rem 0 0";
  link.href = obj.html_url;
  link.textContent = obj.html_url;
  followersP.textContent = `Followers: ${obj.followers}`;
  followingP.textContent = `Following: ${obj.following}`;
  bioP.textContent = `Bio: ${obj.bio}`;

  return card;
}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
