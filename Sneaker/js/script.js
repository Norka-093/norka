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

// # 控制 .product-card 顯示與更換
const productCards = document.querySelectorAll('.product-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 0;
const cardsPerPage = 6; 
// cardsPerPage 顯示 6個 product-card

// # 跳轉至 .product 的頂部
const productElement = document.querySelector('.product');

function showCards() {
    productCards.forEach((card, index) => {
        if (index >= currentPage * cardsPerPage && index < (currentPage + 1) * cardsPerPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function scrollToProductTop() {
    productElement.scrollIntoView({
        behavior: 'smooth' 
        // 平滑滾動效果
    });
}

function handlePrevClick() {
    if (currentPage > 0) {
        currentPage--;
        showCards();
    }
    scrollToProductTop();
}

function handleNextClick() {
    const totalPages = Math.ceil(productCards.length / cardsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        showCards();
    }
    scrollToProductTop();
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