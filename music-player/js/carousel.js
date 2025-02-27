let wrapper = document.querySelectorAll('.carousel .wrapper');
let prev = document.querySelector('.btn-prev');
let next = document.querySelector('.btn-next');

let active = 2;
function loadShow(){
    let stt = 0;
    wrapper[active].style.transform = `none`;
    wrapper[active].style.zIndex = 1;
    wrapper[active].style.filter = 'none';
    wrapper[active].style.opacity = 1;
    for (var i = active +1; i < wrapper.length; i++) {
        stt ++;
        // card 偏移
        wrapper[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        wrapper[i].style.zIndex = -stt;
        // wrapper[i].style.filter = 'blur(1px)';
        wrapper[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt ++;
        // card 偏移
        wrapper[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        wrapper[i].style.zIndex = -stt;
        // wrapper[i].style.filter = 'blur(1px)';
        wrapper[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    // wrapper[0].style.transform = `translateX(${25*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
    // wrapper[4].style.transform = `translateX(${-25*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;

}
loadShow();

next.onclick = function(){
    active = active + 1 < wrapper.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}