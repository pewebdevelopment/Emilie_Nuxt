<template>
    <div>
        <Overlay/>
        <Header/>
    </div>
</template>

<script>
    import Overlay from '@/components/Emile/Navbar/Overlay.vue'
    import Header from '@/components/Emile/Navbar/Header.vue'
    export default {
        name: 'index',
        components: {
            Overlay,
            Header
        }
        
    }
</script>

<style scoped>

</style>