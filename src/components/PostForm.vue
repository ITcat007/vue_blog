<template>
    <form class="post__form" @submit.prevent>
        <input-template 
            v-model="post.title"
            @input="setTitle"
            type="text" 
            placeholder="Заголовок"/>
        <div v-if="v$.post.title.$error">           
            <div class="error" v-if="v$.post.title">
                <template v-if="v$.post.title.maxLength && post.title.length > 0">
                    Длина заголовка не должна превышать {{ v$.post.title.maxLength.$params.max}} символов           
                </template>
            </div>
        </div> 
        <input-template 
            v-model="post.quicktext"
            @input="setQuicktext"
            type="text"
            placeholder="Краткое описание"/>
        <div v-if="v$.post.quicktext.$error">           
            <div class="error" v-if="v$.post.quicktext">
                <template v-if="v$.post.quicktext.maxLength && post.quicktext.length > 0">
                    Краткое описание не должно быть больше {{ v$.post.quicktext.maxLength.$params.max}} символов                
                </template>
            </div>
        </div> 
        <input-template 
            v-model="post.fulltext"
            @input="setFulltext"
            type="text"
            placeholder="Полное содержание"/>
        <div v-if="v$.post.fulltext.$error">           
            <div class="error" v-if="v$.post.fulltext">
                <template v-if="v$.post.fulltext.maxLength && post.fulltext.length > 0">
                    Полное описание не должно быть больше {{ v$.post.fulltext.maxLength.$params.max}} символов                
                </template>
            </div>
        </div> 
        <button-template :disabled="v$.$invalid"
            class="btn btn--publish" 
            @click="createPost">
            Опубликовать
        </button-template>
    </form>
</template>

<script>
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength} from '@vuelidate/validators'
    export default {
        setup () {
            return { v$: useVuelidate() }
        },
        data(){
            return {
                post: {
                    title: '',
                    quicktext: '',
                    fulltext: '',
                    date: '',
                },
            }
        },
        validations (){
            return{          
                post: {
                    title: {
                        required,                    
                        maxLength: maxLength(50)                          
                    },
                    quicktext: {
                        required,                     
                        maxLength: maxLength(100)
                    },
                    fulltext: { 
                        required,                        
                        maxLength: maxLength(255)
                    }
                }
            }
        },
        methods:{
            setTitle($event){
                this.post.title = $event.target.value;
                this.v$.post.title.$touch()
            },
            setQuicktext($event){
                this.post.quicktext = $event.target.value;
                this.v$.post.quicktext.$touch()
            },
            setFulltext($event){
                this.post.fulltext = $event.target.value;
                this.v$.post.fulltext.$touch()
            },
            createPost(){
                const today = new Date();
                this.post.id = Date.now();
                const postDate = (today.getFullYear()) +'-'+ (today.getMonth()+1) +'-'+ (today.getDate());
                this.post.date = postDate;
                this.$emit('create', this.post);
                this.post = {
                    title: '',
                    quicktext: '',
                    fulltext: ''
                }
            }
        }
    }
</script>

<style>    
    .post__form{
        display: flex;
        flex-direction: column;
    }

    .error{
        margin-bottom: 5px;
        font-family: 'Fira Sans', sans-serif;
        font-size: 0.8rem;
        color: red;
        text-align: left;
    }

    .btn--publish{
        align-self: end;
        margin-top: 1.6rem;
        background: #0a5232;
    }

    @media(max-width:576px){
        .btn--publish{
            align-self: center;
        }
    }

    @media(max-width:480px){
        .btn--publish{
            margin-top: 10px;
        }
    }
</style>