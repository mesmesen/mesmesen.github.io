// Declare variables at the top level
let unitGuid = ''; // Variable to store the selected unitGuid
let salVald = '';  // Variable to store the selected schema ID
let tillfällig_kommun = ''; // Variable to store the selected kommun
let fetchedTimetableData = null; // Variable to store fetched timetable data

// Event listener for form submission
document.getElementById("initialForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const hostName = document.getElementById("hostName").value;
    const schemaID = document.getElementById("schemaID").value;

    try {
        const response = await fetch("https://different-jealous-silica.glitch.me/api/timetable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hostName, schemaID })
          });

        const data = await response.json();

        if (response.ok) {
            const schoolsDropdown = document.getElementById("schoolsDropdown");
            schoolsDropdown.innerHTML = '';

            data.forEach(school => {
                const option = document.createElement("option");
                option.value = school.unitGuid;
                option.textContent = school.unitName || "Unnamed School";
                schoolsDropdown.appendChild(option);
            });

            document.getElementById("schoolSelection").style.display = "block";
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error("Error fetching schools:", error);
        console.log("An error occurred while fetching schools.");
    }
});

// Event listener for fetch timetable button
document.getElementById("fetchTimetable").addEventListener("click", async () => {
    try {
        const hostName = document.getElementById("hostName").value;
        const schemaID = document.getElementById("schemaID").value;
        const selectedUnitGuid = document.getElementById("schoolsDropdown").value;

        const response = await fetch("https://different-jealous-silica.glitch.me/api/timetable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hostName, schemaID, unitGuid: selectedUnitGuid })
        });

        const timetableData = await response.json();

        if (response.ok) {
            document.getElementById("timetableData").textContent = JSON.stringify(timetableData, null, 2);
            document.getElementById("timetable").style.display = "block";
        } else {
            console.log(timetableData.message);
        }
    } catch (error) {
        console.error("Error fetching timetable:", error);
        console.log("An error occurred while fetching the timetable.");
    }
});

// Import kommuner from kommuner.js
import kommuner from './kommuner.js';

const nameList = document.getElementById('nameList');
const searchInput = document.getElementById('search');

// Display names from the kommuner.js file
function displayNames(names) {
    nameList.innerHTML = ''; // Clear the list
    names.forEach(name => {
        const nameItem = document.createElement('div');
        nameItem.className = 'name-item';
        nameItem.textContent = name;
        nameItem.addEventListener('click', () => {
            tillfällig_kommun = name; // Set tillfällig_kommun when clicked
            kommun_vald(); // Call the function after setting the variable
        });
        nameList.appendChild(nameItem);
    });
}

// Filter names to match the beginning of the word
function filterNames(query) {
    const filteredNames = kommuner.filter(name =>
        name.toLowerCase().startsWith(query.toLowerCase())
    );
    displayNames(filteredNames);
}

searchInput.addEventListener('input', () => {
    filterNames(searchInput.value);
});

// Initial display of names
displayNames(kommuner.slice(0, 10)); // Display the first 10 names

// Enable scrolling to show more names
nameList.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = nameList;
    if (scrollTop + clientHeight >= scrollHeight) {
        const currentDisplayCount = nameList.childNodes.length;
        displayNames(kommuner.slice(0, currentDisplayCount + 10)); // Load 10 more names
    }
});

// Code for new rooms
const add_screen = document.getElementById("add_screen");
const search_name = document.getElementById("search_name");
const id_val = document.getElementById("id_val");
const skolVal = document.getElementById("skol_val");
const geNamn = document.getElementById("ge_namn");
const namnVal = document.getElementById("namnVal");

document.getElementById("add").addEventListener("click", ny_sal);
document.getElementById("exit1").addEventListener("click", exit_1);
document.getElementById("next1").addEventListener("click", next_1);
document.getElementById("spara").addEventListener("click", () => {
    setTimeout(() => {
        spara_ny(); // Save the new holder

        // Save the current hostName and unitGuid to local storage
        if (tillfällig_namn && tillfällig_kommun && unitGuid) {
            console.log(`Saving hostName: ${tillfällig_kommun}, unitGuid: ${unitGuid} for ${tillfällig_namn}`);
            localStorage.setItem(`hostName-${tillfällig_namn}`, tillfällig_kommun);
            localStorage.setItem(`unitGuid-${tillfällig_namn}`, unitGuid);
            
            fetchWithThrottle(tillfällig_namn);
        } else {
            console.error('Missing data to save hostName or unitGuid');
        }
    }, 0);
});


function ny_sal() {
    add_screen.style.display = "flex";
    search_name.style.display = "flex";
    black_back.style.display = "block";
}

function exit_1() {
    add_screen.style.display = "none";
    search_name.style.display = "none";
    id_val.style.display = "none";
    searchInput.value = '';
    salen.value = "";
    black_back.style.display = "none";
}

function kommun_vald() {
    tillfällig_kommun = tillfällig_kommun.toLowerCase();
    console.log(tillfällig_kommun);
    search_name.style.display = "none";
    id_val.style.display = "flex";
}

const salen = document.getElementById("idval");

function next_1() {
    id_val.style.display = "none";
    salVald = salen.value; // Store the selected schema ID
    console.log(salVald);
    searchInput.value = '';
    fetch_skolor(salVald);
    skolVal.style.display = "block";
}

function skola_vald(schoolUnitGuid) {
    unitGuid = schoolUnitGuid; // Store the selected school unitGuid
    console.log(unitGuid);
    skolVal.style.display = "none";
    geNamn.style.display = "flex";
    salen.value = "";
}

function spara_ny() {
    console.log(`spara_ny() called with tillfällig_namn: ${namnVal.value}`);
    geNamn.style.display = "none";
    add_screen.style.display = "none";
    black_back.style.display = "none";
    let tillfällig_namn = namnVal.value; // Define this before using it in the setTimeout function
    namnVal.value = "";

    if (!tillfällig_namn) {
        console.log('Sal Namn cannot be empty');
        return;
    }

    // Save holder
    saveHolder(tillfällig_namn);

    // Save the current parameters to local storage
    if (tillfällig_kommun && unitGuid) {
        console.log(`Saving hostName: ${tillfällig_kommun}, unitGuid: ${unitGuid} for ${tillfällig_namn}`);
        localStorage.setItem(`hostName-${tillfällig_namn}`, tillfällig_kommun);
        localStorage.setItem(`unitGuid-${tillfällig_namn}`, unitGuid);
        localStorage.setItem(`schemaID-${tillfällig_namn}`, salVald); // Store schemaID

        // Fetch timetable data after saving
        setTimeout(() => {
            fetchTimetableDataAfterSave(tillfällig_namn);
        }, 0);
    } else {
        console.error('Missing data to save hostName or unitGuid');
    }
}

async function fetch_skolor(salVald) {
    try {
        const hostName2 = tillfällig_kommun; // Ensure this is defined earlier
        const schemaID2 = salVald;
        console.log(hostName2);

        const response = await fetch("https://different-jealous-silica.glitch.me/api/timetable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hostName: hostName2, schemaID: schemaID2 })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.message);
            return;
        }

        const data = await response.json();
        console.log(hostName2);
        console.log(data);

        // Set up initial display of names
        displaySchools(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log("An error occurred while fetching data.");
    }
}

// Display schools in the list
function displaySchools(schools) {
    const nameList = document.getElementById('nameList2');
    const searchInput = document.getElementById('search2');

    function createSchoolItem(school) {
        const nameItem = document.createElement('div');
        nameItem.className = 'name-item';
        nameItem.textContent = school.unitName || "Unnamed School";
        nameItem.addEventListener('click', () => {
            const unitGuid = school.unitGuid; // Use unitGuid instead of name
            skola_vald(unitGuid);
            console.log(unitGuid); // Log the school unitGuid
        });
        return nameItem;
    }

    function filterSchools(query) {
        const filteredSchools = schools.filter(school =>
            school.unitName.toLowerCase().startsWith(query.toLowerCase())
        );
        nameList.innerHTML = ''; // Clear the list
        filteredSchools.forEach(school => nameList.appendChild(createSchoolItem(school)));
    }

    // Initial display of all schools
    filterSchools('');

    // Event listener for filtering based on input
    searchInput.addEventListener('input', () => {
        filterSchools(searchInput.value);
    });
}

const black_back = document.getElementById("black_back"); 


















// Initialize holders from localStorage or as an empty array
let holders = JSON.parse(localStorage.getItem('holders')) || [];
let holderId = holders.length > 0 ? holders[holders.length - 1].id + 1 : 0; // Initialize holderId

// Function to create a new holder element
function createHolderElement(holder) {
    if (!holder) {
        console.error('Holder is undefined');
        return;
    }

    const holderDiv = document.createElement('div');
    holderDiv.className = 'holder';
    holderDiv.dataset.id = holder.id;

    holderDiv.innerHTML = `
        <div class="singel_hold">
        <p class="remove_sal" style="cursor: pointer;">X</p>
        <p class="sal_namn">${holder.sal_namn || 'Unnamed Holder'}</p>
        <p class="status">${holder.status || 'Är ledig'}</p>
        <div class=klocka>
        <p class="tid_kvar">Tid Kvar: </p>
        <p class="countdown" id="countdown-${holder.id}">00:00:00</p>
        </div>
        <div class=tills>
        <p class="tid_kvar">Tills: </p>
        <p class="tid">${holder.tid || '00:00:00'}</p>
        </div>
        <div class=lek_info>
        <p class="lärare">${holder.lärare + "," || 'JANNE'}</p>
        <p class="ämne">${holder.ämne || 'CAD'}</p>
        </div>
        </div>
    `;

    const removeButton = holderDiv.querySelector('.remove_sal');
    removeButton.addEventListener('click', function() {
        removeHolder(holder.id);
    });

    return holderDiv;
}

// Function to remove a holder
function removeHolder(id) {
    // Remove the holder from the holders array
    holders = holders.filter(holder => holder.id !== id);

    // Remove holder data from local storage
    const holderToRemove = holders.find(holder => holder.id === id);
    if (holderToRemove) {
        const { sal_namn } = holderToRemove;
        
        localStorage.removeItem(`hostName-${sal_namn}`);
        localStorage.removeItem(`unitGuid-${sal_namn}`);
        localStorage.removeItem(`schemaID-${sal_namn}`);
        localStorage.removeItem(`timetableData-${sal_namn}`);
    }

    // Update local storage with the new holders array
    localStorage.setItem('holders', JSON.stringify(holders));

    // Re-render holders
    renderHolders();
}

// Function to render all holders
function renderHolders() {
    const container = document.getElementById('holders-container');
    container.innerHTML = ''; // Clear existing content

    holders.forEach(holder => {
        const holderElement = createHolderElement(holder);
        container.appendChild(holderElement);
        startCountdownForHolder(holder); // Start the countdown for each holder
    });
}
// Function to save a new holder
function saveHolder(tillfällig_namn) {
    if (!tillfällig_namn) {
        alert('Sal Namn cannot be empty');
        return;
    }

    const newHolder = {
        id: holderId++, // Unique identifier
        sal_namn: tillfällig_namn,
        hostName: tillfällig_kommun,
        schemaID: salVald,
        unitGuid: unitGuid,
        status: 'Är ledig', // Default value
        tid: '00:00:00', // Default value
        lärare: 'JANNE', // Default value
        ämne: 'CAD', // Default value
        lessonStartTime: '00:00:00', // Default value
        lessonEndTime: '00:00:00', // Default value
        lessonDayOfWeek: 1 // Default value (Monday)
    };

    holders.push(newHolder);
    localStorage.setItem('holders', JSON.stringify(holders));
    renderHolders(); // Re-render holders
    fetchTimetableDataAfterSave(newHolder.sal_namn); // Fetch timetable data for the new holder
}


// Render holders on page load
document.addEventListener('DOMContentLoaded', () => {
    function initializeAndRender() {
        holders.forEach(holder => {
            if (holder.sal_namn) {
                fetchTimetableDataAfterSave(holder.sal_namn, false); // Load data without updating UI
            }
        });
        renderHolders();
    }

    // Call the function initially when the page loads
    initializeAndRender();

    // Set up a timer to call the function every 5 minutes
    setInterval(initializeAndRender, 300000); // 300000 milliseconds = 5 minutes
});

// Fetch timetable data after saving
async function fetchTimetableDataAfterSave(tillfällig_namn, shouldUpdate = true) {
    try {
        const savedHostName = localStorage.getItem(`hostName-${tillfällig_namn}`);
        const savedUnitGuid = localStorage.getItem(`unitGuid-${tillfällig_namn}`);
        const savedSchemaID = localStorage.getItem(`schemaID-${tillfällig_namn}`);

        if (!savedHostName || !savedUnitGuid || !savedSchemaID) {
            console.error('Missing data to fetch timetable');
            return;
        }

        const response = await fetch("https://different-jealous-silica.glitch.me/api/timetable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hostName: savedHostName, schemaID: savedSchemaID, unitGuid: savedUnitGuid })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.message);
            return;
        }

        const timetableData = await response.json();
        document.getElementById("timetableData").textContent = JSON.stringify(timetableData, null, 2);

        if (shouldUpdate) {
            mapTimetableToHolder(timetableData, tillfällig_namn);
        } else {
            localStorage.setItem(`timetableData-${tillfällig_namn}`, JSON.stringify(timetableData));
        }
    } catch (error) {
        console.error("Error fetching timetable data:", error);
        console.log("An error occurred while fetching timetable data.");
    }
}

// Update holder with timetable data
function updateHolderWithLessonData(holder, lesson) {
    holder.status = getLessonStatus(lesson);
    holder.tid = lesson.timeStart;
    holder.lärare = lesson.texts[0]; // Assuming this is the teacher
    holder.ämne = lesson.texts[1]; // Assuming this is the subject
    holder.lessonStartTime = lesson.timeStart;
    holder.lessonEndTime = lesson.timeEnd;
    holder.lessonDayOfWeek = lesson.dayOfWeekNumber;

    const holderIndex = holders.findIndex(h => h.id === holder.id);
    holders[holderIndex] = holder;
    localStorage.setItem('holders', JSON.stringify(holders));
    renderHolders();
}


// Map timetable data to holders
function mapTimetableToHolder(timetableData, tillfällig_namn) {
    const holder = holders.find(h => h.sal_namn === tillfällig_namn);
    if (!holder) return;

    const closestLesson = findClosestLesson(timetableData);

    if (closestLesson) {
        updateHolderWithLessonData(holder, closestLesson);
        startCountdownForHolder(holder);
    } else {
        console.error('No future lessons found.');
    }
}

// Calculate and display lesson status
function getLessonStatus(lesson) {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];

    const lessonStart = new Date(`1970-01-01T${lesson.timeStart}Z`);
    const lessonEnd = new Date(`1970-01-01T${lesson.timeEnd}Z`);
    const current = new Date(`1970-01-01T${currentTime}Z`);

    if (current < lessonStart) {
        return 'ledig';
    }
    if (current >= lessonStart && current <= lessonEnd) {
        return 'upptagen';
    }
    return 'ledig';
}

// Calculate time remaining for countdown
function calculateTimeRemaining(endTime) {
    const now = new Date();
    const end = new Date(`1970-01-01T${endTime}Z`);
    const timeDiff = end - now;

    if (timeDiff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

// Start countdown for a lesson
function startCountdown(lesson) {
    const countdownElement = document.getElementById(`countdown-${lesson.guidId}`);
    if (!countdownElement) return; // Skip if the countdown element is not found

    function updateCountdown() {
        const { hours, minutes, seconds } = calculateTimeRemaining(lesson.timeEnd);
        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            countdownElement.textContent = "Time's up!";
            clearInterval(timerInterval);
        }
    }

    updateCountdown(); // Initial call
    const timerInterval = setInterval(updateCountdown, 1000); // Update every second
}

// Find the closest lesson
// Find the closest lesson
function findClosestLesson(lessons) {
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) - 6 (Saturday)
    const currentTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"

    // Create an array to hold lessons for each day of the week
    const lessonsByDay = Array.from({ length: 7 }, () => []);

    // Organize lessons by day of the week
    lessons.forEach(lesson => {
        const dayIndex = lesson.dayOfWeekNumber; // Adjust for 0-based index
        lessonsByDay[dayIndex].push(lesson);
    });

    // Filter today's lessons to find the next one after the current time
    let todaysLessons = lessonsByDay[currentDay].filter(lesson => lesson.timeStart > currentTime);
    if (todaysLessons.length > 0) {
        return todaysLessons.sort((a, b) => a.timeStart.localeCompare(b.timeStart))[0];
    }

    // If no lessons are left today, check the next available day
    for (let offset = 1; offset < 7; offset++) {
        const dayIndex = (currentDay + offset) % 7;
        const dayLessons = lessonsByDay[dayIndex];
        if (dayLessons.length > 0) {
            return dayLessons.sort((a, b) => a.timeStart.localeCompare(b.timeStart))[0];
        }
    }

    // If no future lesson is found (shouldn't happen if data is correct)
    return null;
}

// Example usage
const lessons = [
    // Define your lessons here...
];

const closestLesson = findClosestLesson(lessons);
console.log(closestLesson);

let lastFetchTime = 0;
const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

async function fetchWithThrottle(tillfällig_namn) {
    if (!tillfällig_namn) {
        console.log('No timetable name provided, skipping fetch.');
        return;
    }

    const now = Date.now();
    if (now - lastFetchTime < FETCH_INTERVAL) {
        console.log('Fetch throttled');
        return; // Skip fetch if called too soon
    }
    lastFetchTime = now;
    await fetchTimetableDataAfterSave(tillfällig_namn);
}



function getLocalDayOfWeek() {
    const today = new Date();
    // getDay() returns 0 (Sunday) to 6 (Saturday)
    return (today.getDay() + 6) % 7 + 1; // Adjust to 1 (Monday) to 7 (Sunday)
}

// Function to get the user's local time in "HH:MM:SS" format
function getLocalTime() {
    const today = new Date();
    return today.toTimeString().split(' ')[0]; // "HH:MM:SS"
}

// Function to convert time string to seconds since midnight
function timeToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

// Function to convert seconds to "HH:MM:SS" format with leading zeros
function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to log holder information and calculate time-related info
function logHolderInfo(holder) {
    const countdownElement = document.getElementById(`countdown-${holder.id}`);
    if (!countdownElement) {
        console.error(`Countdown element not found for holder id: ${holder.id}`);
        return;
    }

    function updateCountdown() {
        const timeLeft = calculateTimeLeft(holder);
        if (timeLeft) {
            countdownElement.textContent = secondsToTime(timeLeft.seconds);
            if (timeLeft.seconds <= 0) {
                clearInterval(timerInterval);
                countdownElement.textContent = "Time's up!";
            }
        } else {
            countdownElement.textContent = "No upcoming lessons.";
        }
    }

    updateCountdown(); // Initial call
    const timerInterval = setInterval(updateCountdown, 1000); // Update every second
}

function calculateTimeLeft(holder) {
    const localDayOfWeek = getLocalDayOfWeek();
    const localTime = getLocalTime();

    const lessonStartSeconds = timeToSeconds(holder.lessonStartTime);
    const lessonEndSeconds = timeToSeconds(holder.lessonEndTime);
    const currentSeconds = timeToSeconds(localTime);

    if (localDayOfWeek === holder.lessonDayOfWeek) {
        if (currentSeconds < lessonStartSeconds) {
            return { seconds: lessonStartSeconds - currentSeconds, type: "start" };
        } else if (currentSeconds >= lessonStartSeconds && currentSeconds <= lessonEndSeconds) {
            return { seconds: lessonEndSeconds - currentSeconds, type: "end" };
        }
    } else if (localDayOfWeek < holder.lessonDayOfWeek) {
        const timeUntilStart = ((holder.lessonDayOfWeek - localDayOfWeek) * 86400) + (lessonStartSeconds - currentSeconds);
        return { seconds: timeUntilStart, type: "start" };
    }
    return null;
}

// Example usage
const holder = {
    sal_namn: "Din mamma",
    lessonStartTime: "03:40:36",
    lessonEndTime: "13:33:42",
    lessonDayOfWeek: 3 // Wednesday
};
logHolderInfo(holder);


function startCountdownForHolder(holder) {
    const countdownElement = document.getElementById(`countdown-${holder.id}`);
    if (!countdownElement) {
        console.error(`Countdown element not found for holder id: ${holder.id}`);
        return;
    }

    function updateCountdown() {
        const timeLeft = calculateTimeLeft(holder);
        if (timeLeft) {
            countdownElement.textContent = secondsToTime(timeLeft.seconds);
            if (timeLeft.seconds <= 0) {
                clearInterval(timerInterval);
                countdownElement.textContent = "Time's up!";
            }
        } else {
            countdownElement.textContent = "No upcoming lessons.";
        }
    }

    updateCountdown(); // Initial call
    const timerInterval = setInterval(updateCountdown, 1000); // Update every second
}

//måste lägga till med tiem remaining typ att om det är mer en en vecka elelr liksom att det inte finnsnågon
// tills dag 1 igen så säger den Nästa vecka istället typ aaa!