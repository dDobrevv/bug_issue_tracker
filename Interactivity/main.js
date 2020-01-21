// Send data to localStorage
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    // Creating an issue object
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    // Inserting the object in localStorage
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // Reseting input elements
    document.getElementById("issueInputForm").reset();

    // New element for localStorage
    fetchIssues();

    // Preventing to submitting
    e.preventDefault();
}

// Event set to close method
function setStatusClosed(id) {
    // Retrive from localStorage
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// Event handler Delete
function deleteIssue(id) {
    // Retrive from localStorage
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// Fetching the list of issues that already available. Using browser local storage.
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesLists = document.getElementById('issuesList');

    issuesLists.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        
        issuesLists.innerHTML
        += '<div class="well">' 
        + '<h6>Issue ID: ' 
        + id 
        + '</h6>' 
        + '<p><span class="label label-info">' 
        + status 
        + '</span></p>' 
        + '<h3>' 
        + desc 
        + '</h3>' 
        + '<p><span class="glyphicon glyphicon-time"></span> ' 
        + severity 
        + '</p>' 
        + '<p><span class="glyphicon glyphicon-user"></span> ' 
        + assignedTo 
        + '</p>' 
        + '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> ' 
        + '<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' 
        + '</div';  
    }
}

