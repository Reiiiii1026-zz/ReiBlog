// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBRzFwrPSCipDJWv4_ee514hGmtrSbWvqA",
  authDomain: "rei-sblog.firebaseapp.com",
  databaseURL: "https://rei-sblog.firebaseio.com",
  projectId: "rei-sblog",
  storageBucket: "rei-sblog.appspot.com",
  messagingSenderId: "879316428372",
  appId: "1:879316428372:web:88be6fa8d526c03f596fc1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var ref = db.collection('blog');
var sideBar = document.querySelector('#sideBar nav');

/*----------Load list the paragraph at sidebar.----------*/
ref.orderBy("date", "desc").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    var insert = document.createElement('a');
    insert.href = '?id=' + encodeURIComponent(doc.id);
    insert.classList.add('nav-link');
    var title = document.createTextNode(doc.data().title);
    insert.appendChild(title);
    sideBar.appendChild(insert);
  });
});

/*----------Navbar button----------*/
var addNewBlog = document.querySelectorAll('#header .nav-link')[0];
var editBlog = document.querySelectorAll('#header .nav-link')[1];
var contactMe = document.querySelectorAll('#header .nav-link')[2];
var blog = document.querySelector('.blogContent');
var addBlog = document.querySelector('#addBlog');
addNewBlog.onclick = function(){
  blog.classList.add('hidden');
  addBlog.classList.remove('hidden');
};

/*----------Show blog with URL ID----------*/
var latestPar = document.querySelector('#sideBar nav a');
var urlParams = new URLSearchParams(window.location.search);
var paragraphID = urlParams.get('id');
var blogTitle = document.querySelector('#blog .blogTitle');
var blogDate = document.querySelector('#blog .date');
var blogContent = document.querySelector('#blog .content');

function showBlog(data){
  blogTitle.appendChild(document.createTextNode(data.title));
  blogDate.appendChild(document.createTextNode(data.date));
  blogContent.appendChild(document.createTextNode(data.content));
}

if (paragraphID == null) {
  ref.orderBy("date", "desc").limit(1).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      var data = doc.data();
      showBlog(data);
    });
  });
}else{
  ref.doc(paragraphID).get().then(doc =>{
    var data = doc.data();
    showBlog(data);
  });
}

/*----------Add new blog.----------*/
var inputTitle = document.querySelector('#addBlog .inputTitle');
var inputDate = document.querySelector('#addBlog .date');
var inpuContent = document.querySelector('#addBlog .inputContent');
var submit = document.querySelector('#addBlog .submit');

submit.onclick = function(){
  ref.add({
    title : inputTitle.value,
    date : inputDate.value,
    content: inpuContent.value
  }).then(docRef =>{
    var id = docRef.id;
    window.location.href = "?id=" + encodeURIComponent(id);
  })
};
