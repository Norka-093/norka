let wrapper = document.querySelectorAll('.carousel .wrapper');
let prev = document.querySelector('.btn-prev');
let next = document.querySelector('.btn-next');

let active = 2;
function loadShow(){
    let stt = 0;
    for (var i = active +1; i < wrapper.length; i++) {
        stt ++;
        // card 偏移
        wrapper[i].style.transform = `translateX(${10*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        wrapper[i].style.zIndex = -stt;
        // wrapper[i].style.filter = 'blur(5px)';
        // wrapper[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt ++;
        // card 偏移
        wrapper[i].style.transform = `translateX(${-10*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        wrapper[i].style.zIndex = -stt;
        // wrapper[i].style.filter = 'blur(5px)';
        // wrapper[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();