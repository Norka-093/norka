// New Project / Start at 2025/02/18

// # 顯示與隱藏 .search-box
const search =document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
    // .search-box & .menu-link 同一時間只會顯示其中 1 個
}


// # @media (max-width: 768px) > 顯示與隱藏 .menu-link
const menu =document.querySelector('.menu-link');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// # 捲動頁面時隱藏 .search-box & .menu-link
window.onscroll = () => {
    search.classList.remove('active');
    menu.classList.remove('active');
}
