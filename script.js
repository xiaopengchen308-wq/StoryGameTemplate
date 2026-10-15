// --------------------------------------------------
 // SCENES
 // --------------------------------------------------

let currentScene = "hallway";

const scenes = {

  // SCHOOL HALLWAY
  hallway: {
    title: "School Hallway",
    character: "Student",
    text: "It's Friday after school. The principal took your phone during class and said your parents must come to get it back. You don't want your parents to find out. You are standing in the empty hallway.",
    choices: [
      {
        text: "Go to the classroom",
        nextScene: "classroom"
      },
      {
        text: "Go to the teacher's office",
        action: enterTeacherOffice
      },
      {
        text: "Go downstairs",
        nextScene: "downstairs"
      }
    ]
  },

  // CLASSROOM
  classroom: {
    title: "Empty Classroom",
    character: "Student",
    text: "You enter the empty classroom. You see a cabinet and the teacher's desk. Maybe there is something useful here.",
    choices: [
      {
        text: "Search the cabinet",
        action: function () {
          messageDisplay.textContent = "You search the cabinet but find nothing.";
        }
      },
      {
        text: "Search the teacher's desk",
        action: function () {
          pickUpItem("teacher office key");
          messageDisplay.textContent = "You found the teacher's office key!";
        }
      },
      {
        text: "Go back to the hallway",
        nextScene: "hallway"
      }
    ]
  },

  // TEACHER'S OFFICE
  teacherOffice: {
    title: "Teacher's Office",
    character: "Student",
    text: "You unlock the teacher's office and walk inside. You see a desk and a cabinet. Maybe you can find information about your phone.",
    choices: [
      {
        text: "Search the desk",
        action: function () {
          messageDisplay.textContent = "You found a paper on the desk! It says the principal went to the gym downstairs.";
        }
      },
      {
        text: "Search the cabinet (-10 HP)",
        action: function () {
          updateHealth(-10);
          messageDisplay.textContent = "An insect jumps out of the cabinet and scares you! You lose 10 HP.";
        }
      },
      {
        text: "Go back to the hallway",
        nextScene: "hallway"
      }
    ]
  },

  // DOWNSTAIRS
  downstairs: {
    title: "Downstairs",
    character: "Student",
    text: "You walk downstairs. You see the principal's office, but the door is locked. You can also go outside to the school field.",
    choices: [
      {
        text: "Go to the principal's office",
        nextScene: "office"
      },
      {
        text: "Go to the field",
        nextScene: "field"
      }
    ]
  },

  // SCHOOL FIELD
  field: {
    title: "School Field",
    character: "Student",
    text: "You walk outside to the school field. You see the gym and the school building.",
    choices: [
      {
        text: "Go to the gym",
        nextScene: "gym"
      },
      {
        text: "Go inside the building",
        nextScene: "downstairs"
      }
    ]
  },

  // GYM
  gym: {
    title: "School Gym",
    character: "Student",
    text: "You enter the gym. The principal is nowhere to be seen. You notice a staff office nearby.",
    choices: [
      {
        text: "Go to the staff's office",
        nextScene: "staffOffice"
      },
      {
        text: "Go back to the field",
        nextScene: "field"
      }
    ]
  },

  // STAFF'S OFFICE
  staffOffice: {
    title: "Staff's Office",
    character: "Student",
    text: "You enter the staff's office and see a key on the table. It looks like the key to the principal's office.",
    choices: [
      {
        text: "Pick up the key",
        action: function () {
          pickUpItem("office key");
        },
        nextScene: "gym"
      },
      {
        text: "Don't pick up the key",
        nextScene: "gym"
      }
    ]
  },

  // PRINCIPAL'S OFFICE
  office: {
    title: "Principal's Office",
    character: "Student",
    text: "You arrive at the principal's office. The door is locked. You need a key to get inside.",
    choices: [
      {
        text: "Try to open the door",
        nextScene: "lockedDoor"
      },
      {
        text: "Go back downstairs",
        nextScene: "downstairs"
      }
    ]
  },

  // LOCKED DOOR
  lockedDoor: {
    title: "Locked Office Door",
    character: "Student",
    text: "You stand in front of the locked door. Your phone is somewhere inside.",
    choices: [
      {
        text: "Use the key to unlock the door",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "office"
      }
    ]
  },

  // INSIDE PRINCIPAL'S OFFICE
  insideOffice: {
    title: "Inside Principal's Office",
    character: "Student",
    text: "You open the door and enter the principal's office. You see your phone on the desk!",
    choices: [
      {
        text: "Pick up your phone",
        action: function () {
          pickUpItem("phone");
          messageDisplay.textContent = "You got your phone back!";
        }
      },
      {
        text: "Leave the school",
        action: leaveSchool
      }
    ]
  },

  // ENDING
  solution: {
    title: "Mission Completed!",
    character: "Student",
    text: "You successfully got your phone back and left the school! Your parents never found out what happened. You win!",
    choices: []
  }

};


// --------------------------------------------------
// UPDATE SCENES
// --------------------------------------------------

const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

function updateScene(sceneName) {

  currentScene = sceneName;

  const scene = scenes[sceneName];

  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  messageDisplay.textContent = "";

  choicesContainer.innerHTML = "";

  scene.choices.forEach(function (choice) {

    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {

      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }

    });

    choicesContainer.appendChild(button);

  });
}


// --------------------------------------------------
// HEALTH
// --------------------------------------------------

let health = 100;

const healthDisplay = document.getElementById("health-display");

function updateHealth(amount) {

  health += amount;

  healthDisplay.textContent = health;

}


// --------------------------------------------------
// INVENTORY
// --------------------------------------------------

let inventory = [];

const inventoryDisplay = document.getElementById("inventory-display");
const messageDisplay = document.getElementById("message-display");

function pickUpItem(itemName) {

  if (!inventory.includes(itemName)) {
    inventory.push(itemName);
  }

  inventoryDisplay.textContent = inventory.join(", ");

}


// --------------------------------------------------
// CONDITIONAL
// --------------------------------------------------

// Check if player has teacher's office key
function enterTeacherOffice() {

  if (inventory.includes("teacher office key")) {
    updateScene("teacherOffice");
  } else {
    messageDisplay.textContent = "The teacher's office is locked. You need a key.";
  }

}

// Check if player has principal's office key
function unlockDoor() {

  if (inventory.includes("office key")) {
    updateScene("insideOffice");
  } else {
    messageDisplay.textContent = "The door is locked. You need a key.";
  }

}

// Check if player has picked up the phone
function leaveSchool() {

  if (inventory.includes("phone")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "You need to pick up your phone first!";
  }

}


// --------------------------------------------------
// START GAME
// --------------------------------------------------

updateHealth(0);
updateScene(currentScene);