// 获取所有的 wrapper 元素
let wrapper = document.querySelectorAll('.carousel .wrapper');
// 获取 prev 和 next 按钮元素
let prev = document.querySelector('.btn-prev');
let next = document.querySelector('.btn-next');

// 初始激活的 wrapper 索引，固定 w3 为中心
let active = 2;

// 定义每个 wrapper 之间的间距
const SPACING = 80;

// 加载并显示轮播元素的函数
function loadShow() {
    // 遍历所有 wrapper 元素
    wrapper.forEach((item, index) => {
        let position = index - active;
        let offset = position * SPACING;
        let scale = 1 - Math.abs(position) * 0.1;
        let opacity = Math.abs(position) > 2 ? 0 : 0.6;
        let rotateY = position > 0 ? 1 : -1;

        // 设置 wrapper 的样式
        item.style.transform = `translateX(${offset}px) scale(${scale}) perspective(16px) rotateY(${rotateY}deg)`;
        item.style.zIndex = -Math.abs(position);
        item.style.opacity = index === active ? 1 : opacity;
    });
}

// 初始加载显示
loadShow();

// next 按钮的点击事件处理函数
next.onclick = function () {
    // 循环处理，当到达最后一个 wrapper 时，回到第一个
    active = (active + 1) % wrapper.length;
    loadShow();
};

// prev 按钮的点击事件处理函数
prev.onclick = function () {
    // 循环处理，当到达第一个 wrapper 时，回到最后一个
    active = (active - 1 + wrapper.length) % wrapper.length;
    loadShow();
};