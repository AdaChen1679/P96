var firebaseConfig = {
  apiKey: "AIzaSyCCZUqmjW3U83ZPQaAZmGA3KeSXE-wGTUo",
  authDomain: "tracer-ffc27.firebaseapp.com",
  projectId: "tracer-ffc27",
  storageBucket: "tracer-ffc27.appspot.com",
  messagingSenderId: "494810459913",
  appId: "1:494810459913:web:0280a532adbafe6b59edd8",
  measurementId: "G-3LYDFRXZVM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
console.log(room_name);

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}


//making a function to get the data from the database
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;

        //start code
        console.log(firebase_message_id);
        console.log(message_data);

        name1 = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];

        nametag = "<h4>"+name1+" <img src='tick.png' class='user_tick'></h4>";
        messagetag = "<h4>"+message+"</h4>";
        liketag = "<button class='btn btn-warning' onclick='updateLike(this.id)' id="+firebase_message_id+">";
        spantag = "<span class='glyphicon glyphicon-thumbs-up'></span>LIKE : "+like+"</button>";

        row = nametag+messagetag+liketag+spantag;
        document.getElementById("output").innerHTML += row;


        //end code
      }
    });
  });
}
//calling the function
getData();
function updateLike(message_id)
{

  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updatedlikes = Number(likes)+1;
  console.log(updatedlikes);
  
  firebase.database().ref(room_name).child(message_id).update({
    likes : updatedlikes
  });
}


function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("Tracer.html");
}
