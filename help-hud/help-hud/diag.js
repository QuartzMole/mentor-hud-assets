// Diagnostic diag.js for Help HUD
console.log("✅ diag.js loaded and running");

window.__HUD_APP_BOOTED = true;

(function(){
  var el = document.getElementById("app");
  if (el) {
    el.style.display = "block";
    el.textContent = "✅ Diagnostic diag.js loaded and executed";
  }
  var ld = document.getElementById("loader");
  if (ld) ld.style.display = "none";
})();
