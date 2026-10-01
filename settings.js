const themeToggle=document.getElementById("themeToggle");
const animationToggle=document.getElementById("animationToggle");

function applySettings(){
  const light=localStorage.getItem("lite-theme")==="light";
  const animations=localStorage.getItem("lite-animations")!=="off";
  document.body.classList.toggle("light-theme",light);
  document.body.classList.toggle("no-animations",!animations);
  themeToggle.checked=light;
  animationToggle.checked=animations;
}

themeToggle.addEventListener("change",()=>{
  localStorage.setItem("lite-theme",themeToggle.checked?"light":"dark");
  applySettings();
});

animationToggle.addEventListener("change",()=>{
  localStorage.setItem("lite-animations",animationToggle.checked?"on":"off");
  applySettings();
});

applySettings();