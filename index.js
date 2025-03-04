
function logCompletion(element, taskTitle) {
    const activityLog = document.getElementById('activity-log');
    
   
    const currentTime = new Date();
    const utc6Time = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
    
    //time in 12-hour format with AM/PM
    const hours = utc6Time.getUTCHours();
    const minutes = utc6Time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = utc6Time.getUTCSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
  
    // Creating a new log message
    const logMessage = `You have completed ${taskTitle} at ${formattedTime}`;
    
    // div element for the log entry
    const logEntry = document.createElement('div');
    logEntry.className = 'bg-blue-100 p-2 rounded-lg';
    logEntry.innerHTML = `<span class="text-gray-800">${logMessage}</span>`;
    
    // new log entry to the activity log
    activityLog.appendChild(logEntry);
  
    // Update task counters
    const taskAssigned = document.getElementById('task-assigned');
    let taskCount = parseInt(taskAssigned.textContent);
    
    // Decrease remaining tasks count
    if (taskCount > 0) {
      taskAssigned.textContent = taskCount - 1;
    }
  
    // Increase completed tasks count
    const taskCountElement = document.getElementById('task-count');
    taskCountElement.textContent = parseInt(taskCountElement.textContent) + 1;
  
    // Show success message
    alert("Board Updated Successfully");
  
    // Disable the completed button
    element.onclick = null; // Remove click handler
    element.classList.remove('text-white', 'bg-blue-500', 'cursor-pointer');
    element.classList.add('bg-blue-500', 'opacity-20');
  
    // Check if all tasks are done
    if (taskCount - 1 === 0) {
      alert("Congrates!!! You have completed all the current tasks");
    }
  }
  
  // Clears all activity log entries
  function clearHistory() {
    const activityLog = document.getElementById('activity-log');
    activityLog.innerHTML = ''; // Remove all child elements
  }
  
  // Changes background color to a random color
  function changeBackgroundColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
  
  // Updates the displayed date to current UTC+6 time
  function updateCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    const utc6Time = new Date(now.getTime() + 6 * 60 * 60 * 1000); // Add 6 hours
    
    // Date formatting options
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Build date string pieces
    const dayName = days[utc6Time.getUTCDay()];
    const monthName = months[utc6Time.getUTCMonth()];
    const dayNumber = utc6Time.getUTCDate();
    const year = utc6Time.getUTCFullYear();
    
    // Update date display
    currentDateElement.textContent = `${dayName}, ${monthName} ${dayNumber} ${year}`;
  }
  
  // When page loads: set initial date and update daily
  window.onload = function() {
    updateCurrentDate(); // Set initial date
    setInterval(updateCurrentDate, 24 * 60 * 60 * 1000);
  };