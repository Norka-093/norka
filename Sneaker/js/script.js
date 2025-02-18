// New Project / Start at 2025/02/18

// # 顯示與隱藏 .search-box
const search =document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}