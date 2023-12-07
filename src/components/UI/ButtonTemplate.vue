<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default{
        name: 'button-template'
    }
</script>

<style>
    .btn{
        padding: 14px 16px;
        background: #5f5f5f;
        font-family: 'Montserrat', sans-serif;
        color: #ffffff;
        font-weight: 700;
        text-transform: uppercase;
        border: none;
        border-radius: 22px;
        cursor: pointer;
    }
</style>