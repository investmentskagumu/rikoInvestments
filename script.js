// scroll
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// form
function handleSubmit(e){
  e.preventDefault();
  alert("Message sent!");
}

// mobile nav
function toggleMenu(){
  const nav = document.getElementById("nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-up").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 50){
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});


async function login(){
  const res = await fetch('/api/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      email:document.getElementById('email').value,
      password:document.getElementById('password').value
    })
  });

  const data = await res.json();

  if(data.message){
    window.location.href = "dashboard.html";
  }
}

const USER_ID = "demo-user"; // replace later with real auth

// LOAD REQUESTS
async function loadRequests(){
  const res = await fetch(`/api/requests/${USER_ID}`);
  const data = await res.json();

  const container = document.getElementById('requests');
  container.innerHTML = "";

  let pending = 0;
  let completed = 0;

  data.forEach(req=>{
    const div = document.createElement('div');
    div.classList.add('request-card');

    div.innerHTML = `
      <h4>${req.type}</h4>
      <p>${req.status}</p>
      <span class="status">${req.status}</span>
    `;

    container.appendChild(div);

    if(req.status === "Pending") pending++;
    if(req.status === "Completed") completed++;
  });

  document.getElementById('totalRequests').innerText = data.length;
  document.getElementById('pending').innerText = pending;
  document.getElementById('completed').innerText = completed;
}

// CREATE REQUEST
async function createRequest(e){
  e.preventDefault();

  const type = document.getElementById('serviceType').value;

  await fetch('/api/requests',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      userId:USER_ID,
      type:type
    })
  });

  loadRequests();
}

// LOGOUT
function logout(){
  window.location.href = "index.html";
}

// INIT
loadRequests();