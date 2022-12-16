/**
 * A-WoW.
 */


/*
    Execute these functions through a function when HTML.document is fully loaded.
 */

$(document).ready(function() {
    readAccount();
});


/*
    Create account using AJAX passing it to Database
 */
function createAccount() {
    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#email').val();
    var accountStatus = parseInt($('#accountStatus').val());
    if(username.length > 4 && password.length > 4 && email.length > 4 && accountStatus === 0 || accountStatus === 1) {
        $.post("php/createAccount.php",
            { username: username, pass: password, email: email, account_status: accountStatus}).done(function(data) {
            alert ("Account Created");
            $('#username').val("");
            $('#password').val("");
            $('#email').val("");
            $('#accountStatus').val("");
        });
    } else {
        alert ("Username, Password and email must be atleast 5 chars each and valid AccountStatus")
    }
}

/*
    read account using AJAX reading the PHP that connects with MySQL-Database
 */
//Read Account Table
function readAccount() {
        $.get("php/accountAPI.php", function (data) {
            $("#readAccount").empty();
            var accountArray = JSON.parse(data);
            console.log(accountArray);

            for (i = 0; i < accountArray.length; i++) {
                var row = "" +
                    "<tr>" +
                    "<td>" + accountArray[i].data.id + "</td>" +
                    "<td>" + accountArray[i].data.username + "</td>" +
                    "<td>" + accountArray[i].data.pass.toString().substring(0, 6) + " ...</td>" +
                    "<td>" + accountArray[i].data.email + "</td>" +
                    "<td>" + accountArray[i].data.balance + "</td>" +
                    "<td>" + accountArray[i].data.location + "</td>" +
                    "<td>" + accountArray[i].data.lt_online + "</td>" +
                    "<td>" + accountArray[i].data.account_status + "</td>" +
                    "</tr>"
                $("#readAccount").append(row);
            }
        });

//Update Account Table
        $.get("php/accountAPI.php", function (data) {
            $("#updateAccount").empty();
            var accountArray = JSON.parse(data);
            console.log(accountArray);

            for (i = 0; i < accountArray.length; i++) {
                var row = "" +
                    "<tr>" +
                    "<td>" + accountArray[i].data.id + "</td>" +
                    "<td>" + accountArray[i].data.username + "</td>" +
                    "<td>" + accountArray[i].data.pass.toString().substring(0, 6) + " ...</td>" +
                    "<td>" + accountArray[i].data.email + "</td>" +
                    "<td>" + accountArray[i].data.account_status + "</td>" +
                    '<td><button class="btn btn-danger" disabled >Delete</button></td>' +
                    '<td><button id="updatebtn'+i+'" class="btn btn-info" onclick="getData('+i+')">Update</button></td>' +
                    "</tr>"
                $("#updateAccount").append(row);
            }
        });

//Deleted Account Table
        $.get("php/accountAPI_deleted.php", function (data) {
            $("#deleteAccount").empty();
            var accountArray = JSON.parse(data);
            console.log(accountArray);

            for (i = 0; i < accountArray.length; i++) {
                var row = "" +
                    "<tr>" +
                    "<td>" + accountArray[i].data.id + "</td>" +
                    "<td>" + accountArray[i].data.username + "</td>" +
                    "<td>" + accountArray[i].data.pass.toString().substring(0, 6) + " ...</td>" +
                    "<td>" + accountArray[i].data.email + "</td>" +
                    "<td>" + accountArray[i].data.account_status + "</td>" +
                    '<td><button class="btn btn-danger" onclick="undeleteAccount(' + accountArray[i].data.id + ')">Restore</button></td>' +
                    "</tr>"
                $("#deleteAccount").append(row);
            }
        });
}

/*
    Update Account using AJAX reading the PHP that connects with MySQL-database
 */
function getData(id) {
    var button = $("#updatebtn" + id);
    var getUserId = button.parent().parent("tr").find("td:nth-child(1)").text();
    var getAccount = button.parent().parent("tr").find("td:nth-child(2)").text();
    var getPassword = button.parent().parent("tr").find("td:nth-child(3)").text();
    var getEmail = button.parent().parent("tr").find("td:nth-child(4)").text();
    var getAccountStatus = button.parent().parent("tr").find("td:nth-child(5)").text();

    var row = button.parent().parent("tr").replaceWith(function () {
                return row = "" +
                    "<tr>" +
                    "<td>" + getUserId + "</td>" +
                    "<td>" + '<input type="text" id="updateUsername'+id+'" style="color:black" value="' + getAccount + '"> </input>' + "</td>" +
                    "<td>" + '<input type="text" id="updatePassword'+id+'" style="color:black" value="' + getPassword + '"> </input>' + "</td>" +
                    "<td>" + '<input type="text" id="updateEmail'+id+'" style="color:black" value="' + getEmail + '"> </input>' + "</td>" +
                    "<td>" + '<input type="number" id="updateAccountStatus'+id+'" style="color:black" value="' + getAccountStatus + '"> </input>' + "</td>" +
                    "<td>" + '<button id="deletebtn" class="btn btn-danger" onclick="deleteAccount(' + getUserId + ')">Delete</button>' + "</td>" +
                    "<td>" + '<button id="savebtn'+id+'" class="btn btn-info" onclick="updateAccount(' + id +',' + getUserId + ')">Save</button>' + "</td>" +
                    "</tr>";
    });
}

function updateAccount(rowID, id) {
    var username = $('#updateUsername' + rowID).val();
    var password = $('#updatePassword' + rowID).val();
    var email = $('#updateEmail' + rowID).val();
    var accountStatus = $('#updateAccountStatus' + rowID).val();

    if(confirm("Are you sure you want to save data to Account?"))
        $.post("php/updateAccount.php",
            {id: id, username: username, pass: password, email: email, account_status: accountStatus}).done(function (data) {
            alert("Account Updated with id: " + id + " " + username + " " + password + " " + email + " " + accountStatus);
        });

    var button = $("#savebtn" + rowID);
    var row = button.parent().parent("tr").replaceWith(function () {
        return row = "" +
            "<tr>" +
            "<td>" + id + "</td>" +
            "<td>" + username + "</td>" +
            "<td>" + password + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + accountStatus + "</td>" +
            "<td>" + '<button class="btn btn-danger" disabled>Delete</button>' + "</td>" +
            "<td>" + '<button id="updatebtn'+rowID+'" class="btn btn-info" onclick="getData('+ rowID +')">Update</button>' + "</td>" +
            "</tr>";
    });
}

function deleteAccount(id) {
    if(confirm("Are you sure you want to delete Account with id: " + id + "?")) {
        $.post("php/deleteAccount.php", {id: id}).done(function(data) {
            alert("deleted account with id: " + id);
        });
    }
    location.reload();
}

function undeleteAccount(id) {
    if(confirm("Are you sure you want to restore Account with id: " + id + "?")) {
        $.post("php/restoreAccount.php", {id: id}).done(function(data) {
            alert("Account with id: " + id + " has been restored");
        });
    }
    location.reload();
}


/*
    Display each section of C-R-U-D
 */
function showCreateAccount() {
    document.getElementById('adminCreateAccount').style.display = "block";
    document.getElementById('adminReadAccount').style.display = "none";
    document.getElementById('adminUpdateAccount').style.display = "none";
    document.getElementById('adminDeleteAccount').style.display = "none";
}

function showReadAccount() {
    document.getElementById('adminCreateAccount').style.display = "none";
    document.getElementById('adminReadAccount').style.display = "block";
    document.getElementById('adminUpdateAccount').style.display = "none";
    document.getElementById('adminDeleteAccount').style.display = "none";
}

function showUpdateAccount() {
    document.getElementById('adminCreateAccount').style.display = "none";
    document.getElementById('adminReadAccount').style.display = "none";
    document.getElementById('adminUpdateAccount').style.display = "block";
    document.getElementById('adminDeleteAccount').style.display = "none";
}

function showDeleteAccount() {
    document.getElementById('adminCreateAccount').style.display = "none";
    document.getElementById('adminReadAccount').style.display = "none";
    document.getElementById('adminUpdateAccount').style.display = "none";
    document.getElementById('adminDeleteAccount').style.display = "block";
}
