let dynamicDiv = document.getElementById("dynamic-display");
if (dynamicDiv != null) {
    let reqURL = 'https://dc2a0a8b.ngrok.io/status?key=backlog';

    const Http = new XMLHttpRequest();
    let taskList;
    Http.open("GET", reqURL);
    Http.send();
    Http.onloadend = (e) => {
        console.log(Http.responseText);
        let rc = JSON.parse(Http.responseText);
        taskList = rc.value.split("_");
        console.log(taskList);
        if (taskList[0].length != 0) {            
            for (let i = 0; i < taskList.length; i++) {
                console.log(taskList[i]);
                let req = taskList[i].split("|");
                let taskBlock = document.createElement("div");
                taskBlock.innerHTML = i+1 + ") Request ID: " + req[0] + " | Name: " + req[2] + " | Description: " + req[1] + " | Phone No.: " + req[3];
                taskBlock.className = "task-block";
                dynamicDiv.appendChild(taskBlock);
            }
        } else {
            document.getElementById("volDBHeading").innerHTML = "No Open Requests!";
        }
        
    }    
}

let approvalDiv = document.getElementById("approval-display");
if (approvalDiv != null) {
    let reqURL = 'https://dc2a0a8b.ngrok.io/status?key=waiting';
    const Http = new XMLHttpRequest();
    let taskList;
    Http.open("GET", reqURL);
    Http.send();
    Http.onloadend = (e) => {
        console.log(Http.responseText);
        let rc = JSON.parse(Http.responseText);
        taskList = rc.value.split("_");
        console.log(taskList);
        if (taskList[0].length != 0) {            
            for (let i = 0; i < taskList.length; i++) {
                console.log(taskList[i]);
                let req = taskList[i].split("|");
                let taskBlock = document.createElement("div");
                taskBlock.innerHTML = i+1 + ") Request ID: " + req[0] + " | Name: " + req[2] + " | Description: " + req[1] + " | Phone No.: " + req[3];
                taskBlock.className = "task-block";
                approvalDiv.appendChild(taskBlock);
            }
        } else {
            document.getElementById("volDBHeading").innerHTML = "No Open Requests!";
        }
        
    } 
}

let mapDiv = document.getElementById("mapid");
if (mapDiv != null) {
    let map = L.map('mapid').setView([ 37.767829,-121.768579], 10);
    var OpenMapSurfer_Roads = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
	maxZoom: 1002,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    var marker = L.marker([ 37.668819,-122.080795]).addTo(map);
    marker.bindPopup("<b>James Graham</b><br>+1510999888.").openPopup();
    var marker2 = L.marker([ 37.7159,-121.9101]).addTo(map);
    marker2.bindPopup("<b>Jennifer Anderson</b><br>+1510933445.").openPopup();
    var marker3 = L.marker([37.6604, -121.8758]).addTo(map);
    marker3.bindPopup("<b>Mark Watson</b><br>+1510923432.").openPopup();
    var marker4 = L.marker([37.7799, -121.9780]).addTo(map);
    marker4.bindPopup("<b>Carl David</b><br>+1510998625.").openPopup();
    var marker5 = L.marker([37.9410, -121.9358]).addTo(map);
    marker5.bindPopup("<b>Kylie Kim</b><br>+1510992830.").openPopup();
    var marker6 = L.marker([37.3382, -121.8863]).addTo(map);
    marker6.bindPopup("<b>Trent Matt</b><br>+1510992830.").openPopup();
    var marker7 = L.marker([37.7749, -122.4194]).addTo(map);
    marker7.bindPopup("<b>Chris Hugh</b><br>+1510992830.").openPopup();


    var circle = L.circle([37.767829,-121.768579], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1500
    }).addTo(map);
    circle.bindPopup("Possible wildfire alert incoming!")

    var polygon = L.polygon([
        [37.761550, -122.028597],
        [37.755914,-122.016438],
        [37.775590,-122.010775]
    ]).addTo(map);
    polygon.bindPopup("Tree plantation drive in progress.<br><b>Dwight Myer</b><br>+1510992830.")
}

function error() {
    alert("We need your accurate location to be able to help you.");
}
var categoryVal = "";
var fnameVal = "";
var locationVal = "";
var phNoVal = "";
var problemVal = "";
var coor;
var reqURL = "";
var msgString= "";

function success(position) {
    reqURL = 'https://dc2a0a8b.ngrok.io/raise_new_request?user_id=' + phNoVal;
        reqURL += '&name=' + fnameVal;
    coor = position.coords;
    reqURL += '&lat=' + coor.latitude  + '&lng=' + coor.longitude;
    reqURL +=  '&text=' + problemVal + '&category=' + categoryVal;
    console.log("55");
    console.log(reqURL);
    const Http = new XMLHttpRequest();
    Http.open("GET", reqURL);
    Http.send();
    Http.onreadystatechange = (e) => {
        let rc = JSON.parse(Http.responseText);
        msgString = "<p>Your request has been received. Help ID: "+ rc.help_id+".</p>";
        document.getElementById("form-validation-message").innerHTML = msgString;
    document.getElementById("category").selectedIndex = -1;
    document.getElementById("fname").value = "";
    document.getElementById("location").value = "";
    document.getElementById("phNo").value = "";
    document.getElementById("problem").value = "";
    }        
   
}
let fupload = document.getElementById("fileUpload");
if (fupload != null) {
    const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('file', files[0])
  
    fetch('https://dc2a0a8b.ngrok.io/csv_import', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.path)
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
  })
  
}
function submitRequest() {
    
    categoryVal = document.getElementById("category").value;
    fnameVal = document.getElementById("fname").value;
    locationVal = document.getElementById("location").value;
    phNoVal = document.getElementById("phNo").value;
    problemVal = document.getElementById("problem").value;
    let hasError = false;
    msgString = "";

    if (categoryVal == null || categoryVal.length == 0) {
        msgString = msgString + 'Please provide: your request category';
        hasError = true;
      }
      console.log(categoryVal);
    if (fnameVal == null || fnameVal.length == 0) {
        if (msgString === "") {
            msgString = msgString + 'Please provide: your name';
            } else {
              msgString = msgString + ', your name';
            }      hasError = true;
    }

    if (phNoVal == null || phNoVal.length == 0) {
        if (msgString === "") {
      msgString = msgString + 'Please provide: Mobile Number';
      } else {
        msgString = msgString + ', mobile number';
      }
      hasError = true;
    }
    if (problemVal == null || problemVal.length == 0) {
      if (msgString === "") {
        msgString = msgString + 'Please provide: Your problem requirements';
        } else {
          msgString = msgString + ', and problem requirements';
        }
        hasError = true;
    }
    if (hasError) {
        msgString = msgString;
        document.getElementById("form-validation-message").innerHTML = msgString;
        return;
    } else {
      if (!navigator.geolocation) {
        error();
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }   
}

function searchStatus() {

    let inputVal = document.getElementById("requestID").value;
    let reqURL = 'https://dc2a0a8b.ngrok.io/search_request?id=' + inputVal;
    const Http = new XMLHttpRequest();
    Http.open("GET", reqURL);
    Http.send();
    Http.onreadystatechange = (e) => {
        let rc = JSON.parse(Http.responseText);

        
        if(rc.status === "backlog") {//assignment
            let rString = "Your request ID " + inputVal + " has been accepted! Volunteer assignment in progress!";
            let statusDiv = document.getElementById("statusUpdate");
            let pBar = document.getElementById("progressBar");
            let rc = JSON.parse(Http.responseText);
            pBar.innerHTML = "Accepted";
            pBar.style.width = "50%";
            statusDiv.innerHTML = rString;
            document.getElementById("requestID").value = "";

        } else if (rc.status === "completed") {
            let rString = "Your request ID " + inputVal + " has been completed! Hope we helped!";
            let statusDiv = document.getElementById("statusUpdate");
            let pBar = document.getElementById("progressBar");
            let rc = JSON.parse(Http.responseText);
            pBar.innerHTML = "Completed";
            pBar.style.width = "100%";
            statusDiv.innerHTML = rString;
            document.getElementById("requestID").value = "";

        } else if (rc.status === "accepted") {
            let rString = "Your request ID " + inputVal + " has been accepted! Work is in progress!";
            let statusDiv = document.getElementById("statusUpdate");
            let pBar = document.getElementById("progressBar");
            let rc = JSON.parse(Http.responseText);
            pBar.innerHTML = "Work in progress!";
            pBar.style.width = "75%";
            statusDiv.innerHTML = rString;
            document.getElementById("requestID").value = "";

        }
        else if (rc.status === "waiting") {
            let rString = "Your request ID " + inputVal + " has been marked for review. We will get to you shortly!";
            let statusDiv = document.getElementById("statusUpdate");
            let pBar = document.getElementById("progressBar");
            let rc = JSON.parse(Http.responseText);
            pBar.innerHTML = "Awaiting Approval";
            pBar.style.width = "25%";
            statusDiv.innerHTML = rString;
            document.getElementById("requestID").value = "";

        }
    }
}

let statsTable = document.getElementById("month-stats");
if (statsTable != null) {
    let reqURL = 'https://dc2a0a8b.ngrok.io/stats';
    const Http = new XMLHttpRequest();
    Http.open("GET", reqURL);
    Http.send();
    Http.onreadystatechange = (e) => {
        let rc = JSON.parse(Http.responseText);
        document.getElementById("awaiting-approval").innerHTML = rc.awaiting_approval_help_requests;
        document.getElementById("assigned").innerHTML = rc.backlog_help_requests;
        document.getElementById("in-progress").innerHTML = rc.in_progress_help_requests;
        document.getElementById("completed").innerHTML = rc.fulfilled_help_requests;
    }
}


function getCsvData() {
    let reqURL = 'https://dc2a0a8b.ngrok.io/stats';
    const Http = new XMLHttpRequest();
    Http.open("GET", reqURL);
    Http.send();
    Http.onreadystatechange = (e) => {
        let rc = JSON.parse(Http.responseText);
        document.getElementById("awaiting-approval").innerHTML = rc.awaiting_approval_help_requests;
        document.getElementById("assigned").innerHTML = rc.backlog_help_requests;
        document.getElementById("in-progress").innerHTML = rc.in_progress_help_requests;
        document.getElementById("completed").innerHTML = rc.fulfilled_help_requests;
    }
}

