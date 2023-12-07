<template>
    <form @submit.prevent>
        <input-template
            v-model="comment.name"
            @input="setName"
            type="text" 
            placeholder="Ваше имя"
            class="comment__input"
        />
        <div v-if="v$.comment.name.$error">           
            <div class="error" v-if="v$.comment.name">
                <template v-if="v$.comment.name.maxLength && comment.name.length > 0">
                    Длина имени не должна превышать {{ v$.comment.name.maxLength.$params.max}} символов           
                </template>
            </div>
        </div> 
        <input-template
            v-model="comment.email"
            @input="setEmail"
            type="text" 
            placeholder="Ваш email"
            class="comment__input"
        />
        <div v-if="v$.comment.email.$error">           
            <div class="error" v-if="v$.comment.email">
                <template v-if="v$.comment.email.maxLength && comment.email.length > 0">
                    Длина email не должна превышать {{ v$.comment.email.maxLength.$params.max}} символов           
                </template>
            </div>
        </div>
        <div class="comment__textarea">
            <textarea-template
                v-model="comment.text"
                @input="setText"
                placeholder="Введите текст комментария..."
            />
        </div>
        <div v-if="v$.comment.text.$error">           
            <div class="error" v-if="v$.comment.text">
                <template v-if="v$.comment.text.maxLength && comment.text.length > 0">
                    Комментарий не должен содержать более {{ v$.comment.text.maxLength.$params.max}} символов           
                </template>
            </div>
        </div>
        <button-template
            class="btn"
            @click="sendComment"
            :disabled="v$.$invalid"
        >
            Опубликовать
        </button-template>
    </form>
</template>

<script>
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength} from '@vuelidate/validators'
    export default{
        props:{
            postnumber: Number
        },
        setup () {
            return { v$: useVuelidate() }
        },
        data(){
            return {
                comment: {
                    name: '',
                    email:'',
                    text: '',
                    date: ''
                },
            }
        },
        validations (){
            return{          
                comment: {
                    name: {
                        required,                    
                        maxLength: maxLength(50)                          
                    },
                    email: {
                        required,                     
                        maxLength: maxLength(50)
                    },
                    text: { 
                        required,                        
                        maxLength: maxLength(255)
                    }
                }
            }
        },
        methods: {
            setName($event){
                this.comment.name = $event.target.value;
                this.v$.comment.name.$touch()
            },
            setEmail($event){
                this.comment.email = $event.target.value;
                this.v$.comment.email.$touch()
            },
            setText($event){
                this.comment.text = $event.target.value;
                this.v$.comment.text.$touch()
            },
            sendComment(){
                const today = new Date();
                this.comment.id = Date.now();
                this.comment.postId = this.postnumber;
                const commentDate = (today.getFullYear()) +'-'+ (today.getMonth()+1) +'-'+ (today.getDate());
                this.comment.date = commentDate;
                this.$emit('send', this.comment);
                console.log(this.comment)
                this.comment = {
                    name: '',
                    email: '',
                    text: ''
                }
            }
        }
    }
</script>

<style scoped>
    .input{
        display: block;
        width: 300px;
        border: 1px solid #000;
        padding: 10px;
        margin: 10px 0;
    }

    .comment__input{
        border-radius: 0;
    }

    .comment__textarea{
        min-width: 300px;
        max-width: 700px;
        height: 200px;
    }
    .textarea{
        resize: none;
        width: 100%;
        height: 100%;
        font-family: 'Fira Sans', sans-serif;
        font-size: 0.9rem;
    }

    .btn{
        margin-top: 1.5rem;
    }

    @media(max-width: 576px){
        .btn{
            margin-top: 0.7rem;
        }
    }

</style>