<template>
    <form @submit.prevent>
        <input-template 
            v-model="editPost.title"
            @input="setTitle"
            type="text" 
            placeholder="Заголовок"/>
        <div v-if="v$.editPost.title.$error">           
            <div class="error" v-if="v$.editPost.title">
                <template v-if="v$.editPost.title.maxLength && editPost.title.length > 0">
                    Длина заголовка не должна превышать {{ v$.editPost.title.maxLength.$params.max}} символов                
                </template>
            </div>
        </div> 
        <input-template 
            v-model="editPost.quicktext"
            @input="setQuicktext"
            type="text"
            placeholder="Краткое описание"/>
        <div v-if="v$.editPost.quicktext.$error">           
            <div class="error" v-if="v$.editPost.quicktext">
                <template v-if="v$.editPost.quicktext.maxLength && editPost.quicktext.length > 0">
                    Краткое описание не должно быть больше {{ v$.editPost.quicktext.maxLength.$params.max}} символов                
                </template>
            </div>
        </div> 
        <input-template 
            v-model="editPost.fulltext"
            @input="setFulltext"
            type="text"
            placeholder="Полное содержание"/>
        <div v-if="v$.editPost.fulltext.$error">           
            <div class="error" v-if="v$.editPost.fulltext">
                <template v-if="v$.editPost.fulltext.maxLength && editPost.fulltext.length > 0">
                    Полное описание не должно быть больше {{ v$.editPost.fulltext.maxLength.$params.max}} символов                
                </template>
            </div>
        </div> 
        <div class="post__btns">
            <button-template :disabled="v$.$invalid"
                class="btn btn--publish" 
                @click="changeP(editPost)">
                Сохранить
            </button-template>
            <button-template :disabled="v$.$invalid"
                class="btn btn--reset"
                @click="resetCh">
                Отмена
            </button-template>
        </div>
    </form>
</template>

<script>
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength} from '@vuelidate/validators'
    export default {
        props: {
            post: {
                type: Object,
                required: true
            },
            changeP: Function,
            resetCh: Function
        },
        setup () {
            return { v$: useVuelidate() }
        },
        data(){
            return {
                editPost:{
                    title: this.post.title,
                    quicktext: this.post.quicktext,
                    fulltext: this.post.fulltext,
                    date: '',
                    id: this.post.id
                }
            }
        },
        validations (){
            return{          
                editPost: {
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
                this.editPost.title = $event.target.value;
                this.v$.editPost.title.$touch()
            },
            setQuicktext($event){
                this.editPost.quicktext = $event.target.value;
                this.v$.editPost.quicktext.$touch()
            },
            setFulltext($event){
                this.editPost.fulltext = $event.target.value;
                this.v$.editPost.fulltext.$touch()
            }           
        }   
    }
</script>

<style scoped>
    .post__btns{
        width: 100%;
        margin-top: 1rem;
    }

    .btn--publish{
        margin-top: 0;
        margin-right: 15px;
    }

    .btn--reset{
        background: #7c3b3f;
    }

    @media(max-width:768px){
        .post__btns{
            text-align: center;
        }
    }

    @media(max-width:480px){
        .post__btns{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .btn--publish{
            margin-right: 0;
            margin-bottom: 10px;
        }
    }
</style>
