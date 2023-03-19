<template>
    <div>
        <header class="fixed w-full h-[60px] bg-white z-[999] transition-all duration-[0.4s] ease-[ease]">
            <div class="container mx-auto sm:px-4 h-full py-[15px]">
                <div class="relative float-left -translate-y-2/4 top-2/4">
                    <NuxtLink to="/emilie"> <img src="@/assets/emilie/images/logo.png" class="w-auto max-h-[30px] transition-all duration-[0.4s] ease-[ease]" alt=""> </NuxtLink>
                </div>
                <div class="float-right relative -translate-y-2/4 top-2/4 before:hidden before:absolute before:content-['\f009'] before:w-[15px] before:h-[15px] before:ml-[-22px] before:text-sm before:text-center before:leading-[15px] before:text-[#e2e2e2] before:mr-0 before:mt-[5px] before:mb-0 before:left-0 before:top-0 after:hidden after:content-[''] after:absolute after:w-0.5 after:h-[15px] after:bg-[#e7e7e7] after:right-[34px] after:top-1 before:font-['Font_Awesome_5_Free']">
                    <span class="text-sm font-bold text-[#2e2e2e] uppercase ml-0 mr-[45px] my-0">Menu</span>
                    <div id="trigger-menu" class="absolute w-6 h-[23px] cursor-pointer right-0 top-0 before:content-[''] before:mt-1 after:content-[''] after:mt-[3px] before:block before:h-[3px] before:bg-[#2e2e2e] after:block after:h-[3px] after:bg-[#2e2e2e]"><span class="block h-[3px] bg-[#2e2e2e] mt-[3px]"></span></div>
                </div>
                <div class="float-right relative text-sm font-bold text-[#2e2e2e] uppercase -translate-y-2/4 top-2/4 ">
                    1 800 123 6789
                </div>
            </div>
        </header>

    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
.sticky {
    border-bottom: #e2e2e2 solid 1px;
}
</style>