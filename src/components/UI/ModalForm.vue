<template>
    <div class="modal" v-if="show" @click.stop="hideModal">
        <div @click.stop class="modal__inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'modal-form',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            hideModal() {
                this.$emit('update:show', false)
            }
        }
    }
</script>

<style scoped>
    .modal{
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        display: flex;
    }

    .modal__inner{
        margin: 0 auto;
        padding: 30px 70px;
        background: #fff;
        width: 1000px;
    }

    @media(max-width:1120px){
        .modal__inner{
            height: 50%;
        }
    }

    @media(max-width: 576px){
        .modal__inner{
            padding: 30px;
        }
    }
</style>