<template>
  <div class="w-[100%] flex justify-center font-Play">
    <div class="container w-[100%] md:w-[750px] p-[15px] flex justify-between">
      <div class="log">
        <img src="../../../assets/images/logo.png" alt="logo" />
      </div>
      <div class="sideContent flex">
        <div class="phone font-bold">1800 123 45678</div>
        <div class="menu-open flex ml-[40px]">
          <span class="mr-[10px] font-bold">Menu</span>
          <div
            id="trigger-menu"
            class="burger-menu relative top-0 right-0 w-[23px] h-[24px] cursor-pointer"
          >
            <span class="block h-1 bg-gray-900 mt-[3px]"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Rubik:wght@400;500;700&display=swap");
* {
  font-family: Play, sans-serif;
}
.burger-menu:before {
  content: "";
  margin-top: 4px;
}
.burger-menu:before,
.burger-menu:after {
  display: block;
  height: 3px;
  background-color: #2e2e2e;
}
.burger-menu:after {
  content: "";
  margin-top: 3px;
}
.menu-open:before {
  display: none;
  position: absolute;
  font-family: FontAwesome;
  content: "\f009";
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  margin: 5px 0 0 -22px;
  font-size: 14px;
  text-align: center;
  line-height: 15px;
  color: #e2e2e2;
}
</style>
