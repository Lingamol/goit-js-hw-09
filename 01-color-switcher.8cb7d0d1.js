!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")},n=null;t.btnStart.addEventListener("click",(function(){n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.btnStart.setAttribute("disabled",!0)})),t.btnStop.addEventListener("click",(function(){t.btnStart.removeAttribute("disabled",!0),clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.8cb7d0d1.js.map
