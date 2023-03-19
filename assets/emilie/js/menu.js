(function() {
    var triggerBttn = document.getElementById('trigger-menu'),
        overlay = document.querySelector('div#overlay'),
        closeBttn = overlay.querySelector('div.overlay-close'),
        ul = document.getElementById('ul')

    transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = { transitions: Modernizr.csstransitions };

    function toggleOverlay() {
        if (overlay.classList.contains('open')) {
            overlay.classList.remove('open');
            overlay.classList.add('close');
            ul.classList.add('translate-y-1/4 -rotate-x-35')
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }

                overlay.classList.remove('close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);

            } else {
                onEndTransitionFn();
            }
        } else if (!overlay.classList.contains('close')) {
            overlay.classList.add('open')
            ul.classList.add('opacity-100 w-full rotate-x-0')

        }


    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
})();