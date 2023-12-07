<template>
    <textarea :value="modelValue" @input="updateTextarea" class="textarea"></textarea>
</template>

<script>
    export default{
        name: 'textarea-template',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateTextarea(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .textarea{
        border: 1px solid #000;
        padding: 10px;
    }
</style>