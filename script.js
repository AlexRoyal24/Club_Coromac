// Usuario y contraseña válidos
const validUser = "admin";
const validPass = "1234";

// Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === validUser && password === validPass){
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

// Logout
const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
  logoutBtn.addEventListener("click", function(){
    if(confirm("¿Deseas cerrar sesión?")){
      document.getElementById("main-app").style.display = "none";
      document.getElementById("login-screen").style.display = "block";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }
  });
}

// Agregar stories
function addStory() {
  const storyName = prompt("Nombre del nuevo story:");
  if(!storyName) return;

  const storyContainer = document.getElementById("stories");
  const newStory = document.createElement("div");
  newStory.classList.add("story");
  newStory.innerHTML = `
    <img src="https://i.ibb.co/GftYzcHL/302181871-613346900324480-656276007693452156-n.jpg" alt="story">
    <span>${storyName}</span>
  `;
  storyContainer.appendChild(newStory);
}

// Agregar posts (imágenes o videos)
function addPost() {
  const fileInput = document.getElementById("file-input");
  if(!fileInput.files.length) return alert("Selecciona un archivo primero");

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    const feed = document.getElementById("home-section");
    const post = document.createElement("div");
    post.classList.add("post");

    if(file.type.startsWith("image/")){
      post.innerHTML = `
        <div class="profile">
          <img src="https://i.ibb.co/GftYzcHL/302181871-613346900324480-656276007693452156-n.jpg" class="profile-pic" alt="perfil">
          <span>Club Coromac</span>
        </div>
        <img src="${e.target.result}" alt="post">
        <div class="post-actions">
          <button>❤️</button>
          <button>💬</button>
          <button>🔗</button>
        </div>
        <div class="description">Nuevo post</div>
      `;
    } else if(file.type.startsWith("video/")){
      post.innerHTML = `
        <div class="profile">
          <img src="https://i.ibb.co/GftYzcHL/302181871-613346900324480-656276007693452156-n.jpg" class="profile-pic" alt="perfil">
          <span>Club Coromac</span>
        </div>
        <video controls>
          <source src="${e.target.result}" type="${file.type}">
        </video>
        <div class="post-actions">
          <button>❤️</button>
          <button>💬</button>
          <button>🔗</button>
        </div>
        <div class="description">Nuevo video</div>
      `;
    }

    feed.prepend(post);
    fileInput.value = "";
  };

  reader.readAsDataURL(file);
}

// Navegación entre secciones
function goToSection(sectionId){
  const section = document.getElementById(sectionId);
  if(section){
    section.scrollIntoView({behavior: "smooth"});
  }
}

// Abrir galería para subir contenido en nueva pestaña
function openGallery() {
  window.open("galeria.html", "_blank");
}

// Asignar la función al botón "➕" si existe
const addBtn = document.getElementById("add-btn");
if(addBtn){
  addBtn.addEventListener("click", openGallery);
}
