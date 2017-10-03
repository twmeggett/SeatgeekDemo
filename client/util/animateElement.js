export default function animateElement(element, rule, seconds, params, callback) {
    const animationDurationSecs = seconds + 's';
    const animatedEvents = ['webkitAnimationEnd', 'animationend', 'oanimationend'];
    const animationProps = {
        animationName: rule,
        webkitAnimationName: rule,
        animationDuration: animationDurationSecs,
        webkitAnimationDuration: animationDurationSecs,
    };

    for (prop in animationProps) {
        element.style[prop] = animationProps[prop];
    }

    if (arguments.length === 4) { //if there are only 4 arguments, the last argument can be extra css3 parameters, or a callback
        if (typeof arguments[3] === 'function') {
            callback = arguments[3];
        }
    }

    if (params && typeof params === 'object') {
        for (param in params) {
            element.style[param] = params[param];
        }
    }

    if (callback && typeof callback === 'function') {
        animatedEvents.forEach(function (event) {
            element.addEventListener(event, callback);
        })
    }
}
