import { html, render } from "https://unpkg.com/lit-html?module";

const data_query = {
  places: [
      "All",
      "Earth (Replacement Dimension)",
      "Abadango",
      "Testicle Monster Dimension",
      "Citadel of Ricks",
      "Worldender's lair",
      "Anatomy Park",
      "unknown",
      "Interdimensional Cable",
      "Immortality Field Resort",
      "Signus 5 Expanse",
      "Post-Apocalyptic Earth",
      "Purge Planet",
      "Venzenulon 7",
      "Bepis 9",
      "Earth (C-500A)",
      "Earth (C-137)",
      "Earth (Evil Rick's Target Dimension)",
      "Nuptia 4",
      "Fantasy World",
      "Planet Squanch",
      "Mr. Goldenfold's dream",
      "Rick's Battery Microverse",
      "The Menagerie",
      "Hideout Planet",
      "Zigerion's Base",
      "Giant's Town",
      "Unity's Planet",
      "Dorian 5",
      "Earth (Unknown dimension)",
      "St. Gloopy Noops Hospital",
      "Roy: A Life Well Lived",
      "Resort Planet",
      "Interdimensional Customs",
      "Galactic Federation Prison",
      "Hamster in Butt World",
      "Earth (Giant Telepathic Spiders Dimension)",
      "Alphabetrium",
      "Gazorpazorp",
      "Jerryboree",
      "Pluto",
      "Kyle's Teenyverse",
      "Earth (Fascist Dimension)",
      "Vindicator's Base",
      "Pawn Shop Planet",
      "Mega Gargantuan Kingdom",
      "Gear World",
      "Snake Planet",
      "NX-5 Planet Remover",
      "Zeep Xanflorp's Miniverse",
      "Froopyland",
      "Plopstar",
      "Snuffles' Dream",
      "Earth (Phone Dimension)",
      "Earth (Pizza Dimension)",
      "Greasy Grandma World",
      "Earth (Chair Dimension)",
      "Alien Day Spa",
      "Forbodulon Prime",
      "Earth (Fascist Shrimp Dimension)",
      "Earth (Fascist Teddy Bear Dimension)",
      "Earth (Wasp Dimension)",
      "Monogatron Mothership",
      "Midland Quasar",
      "Mount Space Everest",
      "Globaflyn",
      "Gorgon Quadrant",
      "Heist-Con",
      "Heistotron Base",
      "Gramuflack",
      "Draygon",
      "Non-Diegetic Alternative Reality",
      "Tickets Please Guy Nightmare",
      "Story Train",
      "Morty\u2019s Story",
      "Ricks\u2019s Story",
      "Glorzo Asteroid",
      "Alien Acid Plant",
      "Merged Universe",
      "Near-Duplicate Reality",
    ],
    species: [
        "All",
        "Human",
        "Alien",
        "Humanoid",
        "unknown",
        "Poopybutthole",
        "Mythological Creature",
    "Animal",
    "Robot",
    "Cronenberg",
    "Disease",
  ],
};

const pagination = (n) => {
  return html`
    <div class="pagination">
      ${Array(n)
        .fill()
        .map(
          (_, i) => html`
            <button @click=${() => fetchData(i + 1)}>${i + 1}</button>
          `
        )}
    </div>
  `;
};
const fetchData = async (page, url) => {
  fetch(url ? url : `http://localhost:5000`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      render(
        html`
          ${data.results.map(
            (character) => html`
              <div class="char">
                <img src="${character.image}" />
                <div>
                  <div>
                    <h2 id="${character.name}">${character.name}</h2>
                    <h5 id="${character.species}">${character.species}</h5>
                  </div>
                  <p id="${character.status}" >${isAlive(character.status)} ${character.status}</p>
                  <h4>Last know location:</h4>
                  <p id="${character.location.name}" >${character.location.name}</p>
                </div>
              </div>
            `
          )}
        `,
        document.getElementById("char")
      );
    });
};

const isAlive = (status) => {
  if (status === "Alive") {
    return html`🟢`;
  } else if (status === "Dead") {
    return html`🔴`;
  } else {
    return html`🟡`;
  }
};

const filterL = (e) => {

    let char = document.getElementById("char");
    let all_char = char.getElementsByClassName("char");
    Object.keys(all_char).map((i)=>{
        let specie = all_char[i].getElementsByTagName("p")[1].id;
        if(e.target.value === "All"){
            all_char[i].style.display = "";
        }
        else if(e.target.value === specie){
            all_char[i].style.display = "";
        }
        else{
            all_char[i].style.display = "none";
        }

    })

}

const filterP = (e) => {
    let char = document.getElementById("char");
    let all_char = char.getElementsByClassName("char");

    Object.keys(all_char).map((i)=>{

        let specie = all_char[i].getElementsByTagName("h5")[0].id;
        if(e.target.value === "All"){
            all_char[i].style.display = "";
        }
        else if(e.target.value === specie){
            all_char[i].style.display = "";
        }
        else{
            all_char[i].style.display = "none";
        }

    })
}

const filterS = (e) => {
    let places = document.getElementById("places");
    let species = document.getElementById("species");

    let char = document.getElementById("char");
    let all_char = char.getElementsByClassName("char");
    Object.keys(all_char).map((i)=>{
        let status = all_char[i].getElementsByTagName("h2")[0].id;
        if(e.target.value === ""){
            all_char[i].style.display = "";
        }
        else if(status.toLowerCase().includes(e.target.value)){
            all_char[i].style.display = "";
        }
        else{
            all_char[i].style.display = "none";
        }

    }
    )
}

const inputSys = () => {
  return html`
    <div class="input-container">
        <input @keyup=${filterS} type="text" id="search" placeholder="Search for a character, if you want it all just type 'all'" ></input>
        <div class="multiple">
            <div class="selector">
            <div class="checkboxes">
                ${[{ alive: "🟢" }, { dead: "🔴" }, { unkw: "🟡" }].map(
                  (i) => {
                    console.log(i[Object.keys(i)[0]]);
                    return html`
                      <div class="checkbox">
                        <input
                          type="checkbox"
                          id="$${Object.keys(i)[0]}"
                          @change=${(e) => {}}
                          checked
                        />
                        <label for="${Object.keys(i)[0]}"
                          >${i[Object.keys(i)[0]]} ${Object.keys(i)[0]}</label
                        >
                      </div>
                    `;
                  }
                )}
            </div>
            <div @change=${filterP} class="species">
                <label for="species">Species:</label>
                <br />
                <select id="species">
                ${data_query.species.map(
                  (i) => html` <option value="${i}">${i}</option> `
                )}
                </select>
            </div>
            <div
            @change=${filterL} class="places">
                <label for="places">Location:</label>
                <select id="places">
                    ${data_query.places.map(
                      (i) => html` <option value="${i}">${i}</option> `
                    )}
                </select>
            </div>

        </div>
        </div>
    </div>
    `;
};

const app = () => {
    fetchData(1);
    return html`
    <h1>RICK AND MORTY</h1>
    ${inputSys()}

    <div id="char"></div>
    ${pagination(34)}
  `;
};

render(app(), document.getElementById("app"));
