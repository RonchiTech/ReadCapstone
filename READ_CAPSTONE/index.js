

  var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('users/');
  var rowIndex = 1;

  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();

   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.user_name));

   rowIndex = rowIndex + 1;
    });
  });

  function save_user(){
   var user_name = document.getElementById('user_name').value;

   var uid = firebase.database().ref().child('users').push().key;

   var data = {
    user_id: uid,
    user_name: user_name
   }

   var updates = {};
   updates['/users/' + uid] = data;
   firebase.database().ref().update(updates);

   alert('The user is created successfully!');
   reload_page();
  }

function reload_page(){
 window.location.reload();
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_verified = user.emailVerified;

      if(email_verified){
        document.getElementById("verify_btn").style.display="none";
      } else {
          document.getElementById("verify_btn").style.display="block";
          document.getElementById("info_btn").style.display="none";

      }

      document.getElementById("user_para").innerHTML = "User: " + email_id +
                                                       " <br/> Verified: " + email_verified;

    }



  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
      document.getElementById("register_div").style.display = "none";

  }
});
function register_account(){
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "block";

}

function back_account(){
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "block";
    document.getElementById("register_div").style.display = "none";
}
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);


    // ...
  });


}


function create_account(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);


    // ...
  });


}

function send_verification(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      window.alert("Verification Sent!")
    }).catch(function(error) {
      // An error happened.
      window.alert("Error: " + error.message)
    });
}



function logout(){
  firebase.auth().signOut();
}

function infoback_btn(){
  document.getElementById("user_div").style.display = "block";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "none";
  document.getElementById("information_div").style.display = "none";
}

  function view_information() {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("register_div").style.display = "none";
    document.getElementById("information_div").style.display = "block";

  }

  // function save_user(){
  //   var database = firebase.database()
  //   var firstname = document.getElementById('firstname').value;
  //   var lastname = document.getElementById('lastname').value;
  //   var uid = firebase.database().ref().child('users').push().key;
  //
  //   var data = {
  //     user_id: uid,
  //     firstname: firstname,
  //     lastname: lastname
  //   }
  // }

// //   function save_user(){
// //
// // var users = firebase.database().ref("users");
// // var submitUsers = function(){
// //   var firstname = $("#firstname").val();
// //   var lastname = $("#lastname").val();
// //
// //   users.push({
// //     "firstname": firstname,
// //     "lastname": lastname
// //   })
// //
// // }
//
//   }
//
// // var users = firbase.database().ref("users");
// // var submitUsers = function(){
// // var firsname = $("#firsname").val();
// // var lastname = $("#lastname").val();
// //
// // users.push({
// //   "firsname" : firstname
// //   "lastname" : lastname,
// // });
// // };
// // $(window).load(function () {
// //   $("#recommendationForm").submit(submitUsers);
// // });}
