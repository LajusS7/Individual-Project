const API_URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

const proscons = {
  Jett: {
    pros: ["Excellent mobility with Dash and Updraft", "Can quickly escape after taking a fight", "Cloudburst can be curved and repositioned while thrown"],
    cons: ["Smoke duration is relatively short", "Dash requires a prepared activation", "Limited ability to clear enemies from cover"]
  },
  Raze: {
    pros: ["Blast Packs provide strong movement options", "Paint Shells can clear enemies from areas", "Boom Bot can clear corners and gather information"],
    cons: ["Blast Pack movement has a high skill ceiling", "Explosives can damage Raze if used carelessly", "Less effective when enemies are spread out"]
  },
  Reyna: {
    pros: ["Can heal after kills with Devour", "Dismiss allows her to become untargetable", "Empress greatly improves her combat potential"],
    cons: ["Most abilities require an enemy kill", "Limited utility for supporting teammates", "Can struggle to contribute without kills"]
  },
  Phoenix: {
    pros: ["Curveball can flash around corners", "Hot Hands and Blaze can heal Phoenix", "Run It Back allows aggressive risk-free plays"],
    cons: ["Curveball can flash teammates if poorly placed", "Blaze can block teammates' vision", "Run It Back returns Phoenix to his activation point"]
  },
  Yoru: {
    pros: ["Excellent deception and mind games", "Gatecrash can teleport behind enemy lines", "Long-range flash that activates when hitting a surface"],
    cons: ["Difficult to master effectively", "Experienced players can recognize his tricks", "Requires strong timing and game sense"]
  },
  Neon: {
    pros: ["High Gear provides extremely fast movement", "Slide allows aggressive movement during fights", "Fast Lane can create cover while entering sites"],
    cons: ["High Gear requires careful fuel management", "Sprinting can limit weapon availability", "Movement is easier to punish when predictable"]
  },
  Iso: {
    pros: ["Double Tap can provide a protective shield", "Undercut can weaken enemies through cover", "Kill Contract forces a direct 1v1"],
    cons: ["Limited movement abilities", "Strongly focused on taking gunfights", "Shield requires securing an orb after kills"]
  },
  Waylay: {
    pros: ["Lightspeed provides fast entry movement", "Refract allows her to return to a previous position", "Saturate can Hinder enemies caught in its area"],
    cons: ["Mobility requires careful timing", "Refract can be predictable when activated", "Limited value if enemies avoid her utility"]
  }
};

const statusText = document.querySelector("#status");
const agentGrid = document.querySelector("#agent-grid");
const details = document.querySelector("#details");

let duelists = [];

async function loadAgents() {
  statusText.textContent = "Loading agents...";
  statusText.classList.remove("error");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();

    duelists = [];
    for (const agent of json.data) {
      if (agent.role && agent.role.displayName === "Duelist") {
        duelists.push(agent);
      }
    }

    statusText.textContent = "";
    showAgents(duelists);
  } catch (error) {
    statusText.textContent = "Error loading agents. Please try again later.";
    statusText.classList.add("error");
  }
}

function showAgents(list) {
  agentGrid.innerHTML = "";

  list.forEach(agent => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = agent.displayIcon;
    img.alt = `${agent.displayName} agent icon`;

    const name = document.createElement("h3");
    name.textContent = agent.displayName;

    const button = document.createElement("button");
    button.textContent = "View pros and cons";
    button.addEventListener("click", () => {
      showDetails(agent);
      document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    });

    card.append(img, name, button);
    agentGrid.appendChild(card);
  });
}

function showDetails(agent) {
  const info = proscons[agent.displayName];

  const prosHTML = info ? info.pros.map(p => `<li>${p}</li>`).join("") : "<li>No info yet</li>";
  const consHTML = info ? info.cons.map(c => `<li>${c}</li>`).join("") : "<li>No info yet</li>";

  details.innerHTML = `
    <h2>${agent.displayName}</h2>
    <p>${agent.description}</p>
    <div class="pros-cons">
      <div class="pros">
        <h3>Pros</h3>
        <ul>${prosHTML}</ul>
      </div>
      <div class="cons">
        <h3>Cons</h3>
        <ul>${consHTML}</ul>
      </div>
    </div>
  `;

}

loadAgents();
