document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("loginContainer");
  const homeContainer = document.getElementById("homeContainer");
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // You can add your authentication logic here
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // For simplicity, let's assume a hardcoded username and password
    if (username === "agnik" && password === "1234") {
      // If authentication is successful, show the home page
      loginContainer.style.display = "none";
      homeContainer.style.display = "block";
    } else {
      // If authentication fails, show an error message
      errorMessage.textContent =
        "Invalid username or password. Please try again.";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "http://localhost:3000"; // Change this to your server URL

  // Function to fetch devices from the server
  async function fetchDevices() {
    try {
      const response = await fetch(`${BASE_URL}/devices`);
      const devices = await response.json();
      // Process the retrieved devices, update the UI, etc.
      console.log(devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  }

  // Function to update the status of a device on the server
  async function updateDeviceStatus(deviceId, status) {
    try {
      const response = await fetch(`${BASE_URL}/devices/${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const updatedDevice = await response.json();
      // Process the updated device, update the UI, etc.
      console.log(updatedDevice);
    } catch (error) {
      console.error(`Error updating device ${deviceId} status:`, error);
    }
  }

  // Example usage:
  fetchDevices(); // Fetch devices when the page loads

  // Add event listeners or other code to interact with the UI and call the updateDeviceStatus function as needed
});

document.addEventListener("DOMContentLoaded", function () {
  const lightToggle = document.getElementById("lightToggle");
  const lockToggle = document.getElementById("lockToggle");
  const tvToggle = document.getElementById("tvToggle");
  const microwaveToggle = document.getElementById("microwaveToggle");
  const fanToggle = document.getElementById("fanToggle");
  const kitchenTemperatureDisplay =
    document.getElementById("kitchenTemperature");
  const livingRoomTemperatureDisplay = document.getElementById(
    "livingRoomTemperature"
  );
  const lightIcon = document.getElementById("lightIcon");
  const lockIcon = document.getElementById("lockIcon");
  const tvIcon = document.getElementById("tvIcon");
  const microwaveIcon = document.getElementById("microwaveIcon");
  const fanIcon = document.getElementById("fanIcon");

  let lightsOn = false;
  let lockLocked = true;
  let tvOn = false;
  let microwaveOn = false;
  let fanOn = false;

  lightToggle.addEventListener("click", function () {
    lightsOn = !lightsOn;
    lightToggle.textContent = lightsOn ? "Turn Off" : "Turn On";
    lightIcon.querySelector("img").src = lightsOn
      ? "light-off.png"
      : "light-on.png";
    checkTemperature();
  });

  lockToggle.addEventListener("click", function () {
    lockLocked = !lockLocked;
    lockToggle.textContent = lockLocked ? "Lock" : "Unlock";
    lockIcon.querySelector("img").src = lockLocked
      ? "lock-on.png"
      : "lock-off.png";
    checkTemperature();
  });

  tvToggle.addEventListener("click", function () {
    tvOn = !tvOn;
    tvToggle.textContent = tvOn ? "Turn Off" : "Turn On";
    tvIcon.querySelector("img").src = tvOn ? "tv-off.png" : "tv-on.png";
    checkTemperature();
  });

  microwaveToggle.addEventListener("click", function () {
    microwaveOn = !microwaveOn;
    microwaveToggle.textContent = microwaveOn ? "Turn Off" : "Turn On";
    microwaveIcon.querySelector("img").src = microwaveOn
      ? "microwave-off.png"
      : "microwave-on.png";
    checkTemperature();
  });

  fanToggle.addEventListener("click", function () {
    fanOn = !fanOn;
    fanToggle.textContent = fanOn ? "Turn Off" : "Turn On";
    fanIcon.querySelector("img").src = fanOn ? "fan-off.png" : "fan-on.png";
    checkTemperature();
  });

  // Simulate temperature data for demonstration purposes
  setInterval(() => {
    const kitchenTemperature = getRandomTemperature(20, 50);
    const livingRoomTemperature = getRandomTemperature(18, 50);

    kitchenTemperatureDisplay.textContent = `${kitchenTemperature}°C`;
    livingRoomTemperatureDisplay.textContent = `${livingRoomTemperature}°C`;

    checkTemperature();
  }, 5000);

  function getRandomTemperature(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  function checkTemperature() {
    const kitchenTemperature = parseFloat(
      kitchenTemperatureDisplay.textContent
    );
    const livingRoomTemperature = parseFloat(
      livingRoomTemperatureDisplay.textContent
    );

    if (kitchenTemperature > 50 || livingRoomTemperature > 80) {
      // If temperature is above 80°C, turn off all devices and lock the door
      resetDevices();
    } else {
      // If temperature is back to normal, reset to the previous state
      lightToggle.textContent = lightsOn ? "Turn Off" : "Turn On";
      lockToggle.textContent = lockLocked ? "Lock" : "Unlock";
      tvToggle.textContent = tvOn ? "Turn Off" : "Turn On";
      microwaveToggle.textContent = microwaveOn ? "Turn Off" : "Turn On";
      fanToggle.textContent = fanOn ? "Turn Off" : "Turn On";

      lightIcon.querySelector("img").src = lightsOn
        ? "light-on.png"
        : "light-off.png";
      lockIcon.querySelector("img").src = lockLocked
        ? "lock-on.png"
        : "lock-off.png";
      tvIcon.querySelector("img").src = tvOn ? "tv-on.png" : "tv-off.png";
      microwaveIcon.querySelector("img").src = microwaveOn
        ? "microwave-on.png"
        : "microwave-off.png";
      fanIcon.querySelector("img").src = fanOn ? "fan-on.png" : "fan-off.png";
    }
  }

  function resetDevices() {
    // Turn off all devices and lock the door
    lightsOn = false;
    lockLocked = true;
    tvOn = false;
    microwaveOn = false;
    fanOn = false;

    lightToggle.textContent = "Turn On";
    lockToggle.textContent = "Lock";
    tvToggle.textContent = "Turn On";
    microwaveToggle.textContent = "Turn On";
    fanToggle.textContent = "Turn On";

    lightIcon.querySelector("img").src = "light-off.png";
    lockIcon.querySelector("img").src = "lock-off.png";
    tvIcon.querySelector("img").src = "tv-off.png";
    microwaveIcon.querySelector("img").src = "microwave-off.png";
    fanIcon.querySelector("img").src = "fan-off.png";
  }
});
