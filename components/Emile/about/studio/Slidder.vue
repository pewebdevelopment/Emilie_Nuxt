<template>
  <div class="slide-wrapper relative">
    <div class="flexslider">
      <ul class="slides">
        <li
          class="featured-image"
          style="
            width: 100%;
            float: left;
            margin-right: -100%;
            position: relative;
            opacity: 0;
            display: block;
            z-index: 1;
          "
        >
          <!-- about-us-slider01.jpg -->
          <img
            src="../../../../assets/images/upload/about-us-slider01.jpg"
            alt="slide image"
            draggable="false"
          />
        </li>
        <li
          class="featured-image flex-active-slide"
          style="
            width: 100%;
            float: left;
            margin-right: -100%;
            position: relative;
            opacity: 1;
            display: block;
            z-index: 2;
          "
        >
          <img
            src="../../../../assets/images/upload/about-us-slider02.jpg"
            alt="slide image"
            draggable="false"
          />
        </li>
        <li
          class="featured-image"
          style="
            width: 100%;
            float: left;
            margin-right: -100%;
            position: relative;
            opacity: 0;
            display: block;
            z-index: 1;
          "
        >
          <img
            src="../../../../assets/images/upload/about-us-slider03.jpg"
            alt="slide image"
            draggable="false"
          />
        </li>
      </ul>
    </div>

    <!--Custom Navigation Start-->
    <ul class="slide-nav">
      <li>
        <a class="slide-prev" href="prev"><i class="fa fa-angle-left"></i></a>
      </li>
      <li>
        <a class="slide-next" href="next"><i class="fa fa-angle-right"></i></a>
      </li>
    </ul>
    <!--Custom Navigation End-->
  </div>
</template>

<script setup></script>

<style></style>
