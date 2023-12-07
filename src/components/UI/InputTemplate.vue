<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input">
</template>

<script>
    export default{
        name: 'input-template',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style>
    .input{
        width: 100%;
        margin-top: 8px;
        margin-bottom: 8px;
        font-family: 'Fira Sans', sans-serif;
        font-size: 0.9rem;
        border: 2px solid #979797;
        border-radius: 10px;
        padding: 10px;
    }
</style>