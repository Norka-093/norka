// Projects Slide
$(document).ready(function () {
    let currentIndex = 0;
    const slides = $(".slider-images a"); // 修改選擇器，確保 <a> 也參與輪播
    const dots = $(".dot");
    let autoSlideInterval;
    
    function updateSlider(index) {
        slides.removeClass("active").eq(index).addClass("active");
        dots.removeClass("active").eq(index).addClass("active");
    }
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        }, 5000);
    }
    // 點擊後重置計時器
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    $(".next-btn").click(function () {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
        resetAutoSlide();
    });
    $(".prev-btn").click(function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
        resetAutoSlide();
    });
    dots.click(function () {
        let index = $(this).data("index");
        if (index !== undefined) {
            currentIndex = index;
            updateSlider(currentIndex);
            resetAutoSlide();
        }
    });

    // 確保第一個 <a> 為 active
    slides.eq(0).addClass("active");
    dots.eq(0).addClass("active");
    startAutoSlide();
});

// contact-box
// 透過點擊特定 class 使 .contact-box 顯示，點擊其他位置時消失
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtns = document.querySelectorAll('.hire-me-click');
    const contactBox = document.querySelector('.contact-box');

    // 為元素新增點擊事件監聽器
    toggleBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            contactBox.classList.toggle('show');
            event.stopPropagation();
        });
    });
    document.addEventListener('click', function (event) {
        if (contactBox.classList.contains('show') && 
            !contactBox.contains(event.target) && 
            !event.target.closest('.hire-me-click')) {
            contactBox.classList.remove('show');
        }
    });
});

// 確保 Web3Forms API 正確運作
document.querySelector(".contact-box-right").addEventListener("submit", function (e) {
    e.preventDefault();    // 防止表單自動提交
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(this),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Message sent successfully!");
            this.reset();
        } else {
            alert("Error sending message. Please try again.");
        }
    })
    .catch(error => console.error("Error:", error));
});

// skill
// 透過 jquery-circle-progress 顯示圓形進度條
$(document).ready(function() {
    let commonOptions = {
        startAngle: -1.55,
        size: 120, // ! 這裡的值要和CSS中的寬度和高度一致
        fill: {gradient: ["#0088a9", "#00c9a7"]}
    };
    // HTML 進度條
    $(".html .bar").circleProgress({
        ...commonOptions,
        value: 0.90
    }).on('circle-animation-progress', function(event, progress, stepValue){
        $(this).closest('.circle').find('.box span').text((stepValue * 100).toFixed(0) + '%');
    });

    // CSS 進度條
    $(".css .bar").circleProgress({
        ...commonOptions,
        value: 0.85
    }).on('circle-animation-progress', function(event, progress, stepValue){
        $(this).closest('.circle').find('.box span').text((stepValue * 100).toFixed(0) + '%');
    });

    // JavaScript 進度條
    $(".js .bar").circleProgress({
        ...commonOptions,
        value: 0.70
    }).on('circle-animation-progress', function(event, progress, stepValue){
        $(this).closest('.circle').find('.box span').text((stepValue * 100).toFixed(0) + '%');
    });

    // React JS 進度條
    $(".react .bar").circleProgress({
        ...commonOptions,
        value: 0.60
    }).on('circle-animation-progress', function(event, progress, stepValue){
        $(this).closest('.circle').find('.box span').text((stepValue * 100).toFixed(0) + '%');
    });
});

// skill
// 左右拖移 .card-box
document.addEventListener('DOMContentLoaded', function () {
    const cardBox = document.querySelector('.skill .card-box');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // 滑鼠點擊事件
    cardBox.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.pageX - cardBox.offsetLeft;
        scrollLeft = cardBox.scrollLeft;
    });

    // 滑鼠移動事件
    cardBox.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - cardBox.offsetLeft;
        const walk = (x - startX) * 3;    // 移動速度
        cardBox.scrollLeft = scrollLeft - walk;
    });

    // 滑鼠放開事件
    cardBox.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // 滑鼠移出事件
    cardBox.addEventListener('mouseleave', function () {
        isDragging = false;
    });

    // 支援觸摸事件（用於行動裝置）
    cardBox.addEventListener('touchstart', function (e) {
        isDragging = true;
        startX = e.touches[0].pageX - cardBox.offsetLeft;
        scrollLeft = cardBox.scrollLeft;
    });

    cardBox.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - cardBox.offsetLeft;
        const walk = (x - startX) * 3;
        cardBox.scrollLeft = scrollLeft - walk;
    });

    cardBox.addEventListener('touchend', function () {
        isDragging = false;
    });

    cardBox.addEventListener('touchcancel', function () {
        isDragging = false;
    });
});
