// # 顯示與隱藏 .search-box
const search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
    // .search-box & .menu-link 同一時間只會顯示其中 1 個
}
// *-- end --* //


// # 顯示與隱藏 .language-dropdown
const languageDropdown = document.querySelector('.language-dropdown');
const languageIcon = document.querySelector('#language-icon');

// 點選 icon 時顯示或隱藏語言下拉選單
languageIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    languageDropdown.classList.toggle('active');
});

// 捲動頁面時隱藏語言下拉選單
window.addEventListener('scroll', function () {
    languageDropdown.classList.remove('active');
});

// 點選頁面空白處時隱藏語言下拉選單
document.addEventListener('click', function (event) {
    const isLanguageIcon = event.target.id === 'language-icon';
    const isLanguageDropdown = event.target.closest('.language-dropdown');

    if (!isLanguageIcon && !isLanguageDropdown) {
        languageDropdown.classList.remove('active');
    }
});
// *-- end --* //


// # @media (max-width: 768px) > 顯示與隱藏 .menu-link
const menu =document.querySelector('.menu-link');
document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}
// *-- end --* //


// # 捲動頁面時隱藏 .search-box & .menu-link
window.onscroll = () => {
    search.classList.remove('active');
    menu.classList.remove('active');
}
// # 點擊網頁空白處時隱藏 .search-box & .menu-link
document.addEventListener('click', function (event) {
    const isSearchIcon = event.target.id === 'search-icon';
    const isMenuIcon = event.target.id === 'menu-icon';
    const isSearchBox = event.target.closest('.search-box');
    const isMenuLink = event.target.closest('.menu-link');

    if (!isSearchIcon && !isMenuIcon && !isSearchBox && !isMenuLink) {
        search.classList.remove('active');
        menu.classList.remove('active');
    }
});
// *-- end --* //


// # 控制 .sneaker-card 顯示與更換
const sneakerCards = document.querySelectorAll('.sneaker-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 0;
const cardsPerPage = 6; 
// cardsPerPage 顯示 6個 sneaker-card

// # 跳轉至 .sneaker 的頂部
const sneakerElement = document.querySelector('.sneaker');
function showCards() {
    sneakerCards.forEach((card, index) => {
        if (index >= currentPage * cardsPerPage && index < (currentPage + 1) * cardsPerPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function scrollToSneakerTop() {
    sneakerElement.scrollIntoView({
        behavior: 'smooth' 
        // 平滑滾動效果
    });
}
function handlePrevClick() {
    if (currentPage > 0) {
        currentPage--;
        showCards();
    }
    scrollToSneakerTop();
}
function handleNextClick() {
    const totalPages = Math.ceil(sneakerCards.length / cardsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        showCards();
    }
    scrollToSneakerTop();
}
// 跳到第1頁
if (prevBtn) {
    prevBtn.addEventListener('click', handlePrevClick);
}
// 跳到第2頁
if (nextBtn) {
    nextBtn.addEventListener('click', handleNextClick);
}
// 初始顯示第1頁
showCards();
// *-- end --* //


// # 控制 column.scrollbar 顯示
function handleScrollbar() {
    const processContainer = document.querySelector('.process-container');
    const windowWidth = window.innerWidth;

    // 當 window width < 1271px
    if (windowWidth < 1271) {
        processContainer.classList.add('column-scrollbar');
    } else {
        processContainer.classList.remove('column-scrollbar');
    }
}
// 視窗加載完成時執行 handleScrollbar()
window.addEventListener('DOMContentLoaded', handleScrollbar);
// 監聽視窗寬度變化
window.addEventListener('resize', handleScrollbar);
// *-- end --* //