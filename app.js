function detectDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad/.test(ua)) {
    document.body.classList.add("iphone-view");
  } else {
    document.body.classList.add("desktop-view");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  detectDevice();
  const clock = document.getElementById("clock");
  if(clock){
    setInterval(()=>{
      const now = new Date();
      clock.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },1000);
  }
});
