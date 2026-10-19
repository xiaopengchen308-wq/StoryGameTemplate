// --------------------------------------------------
 // SCENES
 // --------------------------------------------------

// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "hallway";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
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

  classroom: {
    title: "Empty Classroom",
    character: "Student",
    text: "You enter the empty classroom. You see a cabinet and the teacher's desk. Maybe there is something useful here.",
    choices: [
      {
        text: "Search the cabinet",
        action: function () {
          messageDisplay.textContent ="the sound of you opening the cabinet is too loud(+50 Fear)";
          updateHealth(+50)
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

  teacherOffice: {
    title: "Teacher's Office",
    character: "Student",
    text: "You unlock the teacher's office and walk inside. You see a desk and a cabinet. Maybe you can find something useful.",
    choices: [
      {
        text: "Search the desk",
        action: function () {
          pickUpItem("staff office key");
          messageDisplay.textContent = "You found the staff office key!";
        }
      },
      {
        text: "Search the cabinet",
        action: function () {
          messageDisplay.textContent = "An insect jumps out of the cabinet and scares you! (+50 fear).";
          updateHealth(+50);
        }
      },
      {
        text: "Go back to the hallway",
        nextScene: "hallway"
      }
    ]
  },

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

  gym: {
    title: "School Gym",
    character: "Student",
    text: "You enter the gym. The principal is nowhere to be seen. You notice a staff office nearby.",
    choices: [
      {
        text: "Go to the staff's office",
        action: enterStaffOffice
      },
      {
        text: "Go back to the field",
        nextScene: "field"
      }
    ]
  },
  staffOffice: {
    title: "Staff's Office",
    character: "Student",
    text: "You unlock the staff's office and see a key on the table. It looks like the key to the principal's office.",
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
  solution: {
    title: "Mission Completed!",
    character: "Student",
    text: "You successfully got your phone back and left the school! Your parents never found out what happened. You win!",
    choices: []
  },

  gameOver: {
    title: "Game Over",
    character: "Student",
    text: "you're being scare, so you decide to go home and try to get your phone next week",
    choices: []
  }

};




// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
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

let health = 0;

const healthDisplay = document.getElementById("health-display");

function updateHealth(amount) {

  health += amount;

  if (health == 100) {
    healthDisplay.textContent = health;
    updateScene("gameOver");
  } else {
    healthDisplay.textContent = health;
  }

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

// Check if player has staff office key
function enterStaffOffice() {

  if (inventory.includes("staff office key")) {
    updateScene("staffOffice");
  } else {
    messageDisplay.textContent = "The staff's office is locked. You need a key.";
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



