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