<template>
    <div>
        <div class="overlay overlay-hugeinc fixed w-full h-full z-[9999] bg-no-repeat bg-cover bg-[center_center] left-0 top-0 close" id="overlay" data-image-src="images/upload/overlay-menu-bg.jpg">
            <div class="overlay-nav-wrapper relative w-full h-screen overflow-hidden overflow-y-auto">
                <div class="container relative h-screen">

                    <!--Menu Close Start-->
                    <div class="menu-close-wrapper">
                        <div class="container">
                            <div class="menu-close">
                                <span>Close</span>
                                <div id="overlay-close" class="overlay-close"></div>
                            </div>
                        </div>
                    </div>
                    <!--Menu Close End-->

                    <!--Navigation Menu Start-->
                    <nav class="main-menu perspective-1200">
                        <ul id="ul" class="opacity-40 transition-transform duration-[0.5s,opacity] delay-[0.5s] -translate-y-1/4 rotate-x-35">
                            <li><a href="index.html">Home</a>
                                <ul>
                                    <li><a href="index.html"><span data-hover="Homepage one">Homepage one</span></a></li>
                                    <li><a href="homepage-two.html"><span data-hover="Homepage two">Homepage two</span></a>
                                    </li>
                                    <li><a href="homepage-three.html"><span data-hover="Homepage three">Homepage
                                                three</span></a></li>
                                    <li><a href="homepage-four.html"><span data-hover="Homepage four">Homepage
                                                four</span></a></li>
                                </ul>
                            </li>
                            <li><a href="about-us-studio.html">About Us</a>
                                <ul>
                                    <li><a href="about-us-personal.html"><span data-hover="Personal photography">Personal
                                                photography</span></a></li>
                                    <li><a href="about-us-studio.html"><span data-hover="Studio photography">Studio
                                                photography</span></a></li>
                                </ul>
                            </li>
                            <li><a href="#">Galleries</a>
                                <ul>
                                    <li><a href="gallery-one.html"><span data-hover="Gallery one">Gallery one</span></a>
                                    </li>
                                    <li><a href="gallery-two.html"><span data-hover="Gallery two">Gallery two</span></a>
                                    </li>
                                    <li><a href="gallery-three.html"><span data-hover="Gallery three">Gallery
                                                three</span></a></li>
                                    <li><a href="gallery-four.html"><span data-hover="Gallery four">Gallery four</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="#">Gallery Single</a>
                                <ul>
                                    <li><a href="gallery-single-one.html"><span data-hover="Gallery single one">Gallery
                                                single one</span></a></li>
                                    <li><a href="gallery-single-two.html"><span data-hover="Gallery single two">Gallery
                                                single two</span></a></li>
                                    <li><a href="gallery-single-three.html"><span data-hover="Gallery single three">Gallery
                                                single three</span></a></li>
                                </ul>
                            </li>
                            <li><a href="#">Blog</a>
                                <ul>
                                    <li><a href="blog-standard.html"><span data-hover="Blog standard">Blog
                                                standard</span></a></li>
                                    <li><a href="blog-masonry.html"><span data-hover="Blog masonry">Blog masonry</span></a>
                                    </li>
                                    <li><a href="blog-single.html"><span data-hover="Blog single">Blog single</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="prices.html">Prices</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                            <li><a href="elements.html">Elements</a></li>
                        </ul>
                    </nav>
                    <!--Navigation Menu End-->

                </div>
            </div>
        <div class="color-overlay absolute w-full h-full bg-[rgba(46,46,46,0.85)] z-[-1] left-0 top-0"></div>
    </div>
</div></template>

<script>

export default {
    name: 'Overlay',
//     mounted () {
//     const triggerBttn = document.getElementById('trigger-menu')
//     const overlay = document.getElementById('overlay')
//     const closeBttn = document.getElementById('overlay-close')
//     const ul = document.getElementById('ul')

//     const transEndEventNames = {
//       'WebkitTransition': 'webkitTransitionEnd',
//       'MozTransition': 'transitionend',
//       'OTransition': 'oTransitionEnd',
//       'msTransition': 'MSTransitionEnd',
//       'transition': 'transitionend'
//     }
//     const transEndEventName = transEndEventNames[Modernizr.prefixed('transition')]
//     const support = { transitions: Modernizr.csstransitions }

//     function toggleOverlay () {
//       if (overlay.classList.contains('open')) {
//         overlay.classList.remove('open')
//         overlay.classList.add('close')
//         ul.classList.add('translate-y-1/4 -rotate-x-35')
//         const onEndTransitionFn = function (ev) {
//           if (support.transitions) {
//             if (ev.propertyName !== 'visibility') return
//             this.removeEventListener(transEndEventName, onEndTransitionFn)
//           }

//           overlay.classList.remove('close')
//         }
//         if (support.transitions) {
//           overlay.addEventListener(transEndEventName, onEndTransitionFn)

//         } else {
//           onEndTransitionFn()
//         }
//       } else if (!overlay.classList.contains('close')) {
//         overlay.classList.add('open')
//         ul.classList.add('opacity-100 w-full rotate-x-0')
//       }
//     }

//     triggerBttn.addEventListener('click', toggleOverlay)
//     closeBttn.addEventListener('click', toggleOverlay)
//   }
    
}


</script>

<style scoped>
    .open{
        opacity: 1;
	visibility: visible;
	-webkit-transition: opacity 0.5s;
	-moz-transition: opacity 0.5s;
	-ms-transition: opacity 0.5s;
	-o-transition: opacity 0.5s;
	transition: opacity 0.5s;
    }
    .close{
        opacity: 0;
	visibility: hidden;
	-webkit-transition: opacity 0.5s, visibility 0s 0.5s;
	-moz-transition: opacity 0.5s, visibility 0s 0.5s;
	-ms-transition: opacity 0.5s, visibility 0s 0.5s;
	-o-transition: opacity 0.5s, visibility 0s 0.5s;
	transition: opacity 0.5s, visibility 0s 0.5s;
    }
</style>