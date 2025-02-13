"use strict";   
// JavaScript 語法，它告訴執行環境執行程式碼時應該遵循 "嚴格模式"
// ex.禁止使用未經聲明的變數、禁止重複定義變數、禁止刪除不可刪除的屬性

// navbar toggle (導航欄 切換 (.active))
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];
for(let i = 0; i < navElems.length; i++){
    navElems[i].addEventListener("click", function() {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    });
}


