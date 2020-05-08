const nativeSmoothScrollTo = elem => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: elem.getBoundingClientRect().top + window.pageYOffset
    });
};

const smoothScrollTo = (to, duration) => {
    const element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date();

    const easeInOutQuad = (t, b, c, d) => {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    const animateScroll = _ => {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
        else {
            element.scrollTop = to;
        }
    };
    animateScroll();
};

const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

const scrollToElem = elemSelector => {
    if (!elemSelector) {
        return;
    }

    const elem = document.querySelector(elemSelector);
    if (elem) {
        if (supportsNativeSmoothScroll) {
            nativeSmoothScrollTo(elem);
        } else {
            smoothScrollTo(elem.offsetTop, 600);
        }
    }
};

export default scrollToElem;