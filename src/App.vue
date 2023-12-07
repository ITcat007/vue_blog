<template>
    <div class="app">
        <router-view>
        </router-view>
    </div>
</template>

<script>
    export default{
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
    }

    @media(max-width: 576px){
        body{
            font-size: 14px;
        }
    }

</style>