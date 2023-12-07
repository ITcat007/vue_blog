<template>
    <div class="post">
        <div class="post__content">
            <div class="post__title">Тема: <span>{{post.title}}</span></div>
            <div class="post__text">{{post.quicktext}}</div>
            <div class="post__bottom">
                <div class="post__date">{{(new Date(post.date)).toLocaleDateString()}}</div>
                <div class="post__comments">{{numberOfComments}} <img src="../assets/dialog.png" alt="dialog"></div>
            </div>
        </div>
        <div class="post__btns">
            <button-template class="btn btn--more"
                @click="$router.push(`/${post.id}`)"
            >
                Подробнее
            </button-template>
            <button-template class="btn btn--delete"
                @click="$emit('remove', post)"
            >
                Удалить
            </button-template>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                numberOfComments: 0
            }
        },
        mounted(){
            if(JSON.parse(localStorage.getItem("comments"))){
                let parsed = JSON.parse(localStorage.getItem("comments"));
                let comments = parsed.filter(c => c.postId == this.post.id);
                this.numberOfComments = comments.length;
            } else {
                this.numberOfComments = 0;
            }
        }
    }
</script>

<style>
    .post{
        margin-top: 30px;
        padding: 30px;
        border: 2px solid #d1d1d1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
    }

    .post__content{
        width: 70%;
        overflow-wrap: break-word;
    }

    .post__title{
        font-family: 'Fira Sans', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        color: #ad6b44;
        margin-bottom: 1.3rem;
        text-transform: uppercase;
    }

    .post__title span{
        font-size: 1.3rem;
        font-weight: 400;
        color: #0a5232;
        text-transform: initial;
        padding-left: 5px;
    }

    .post__text{
        margin-bottom: 1.7rem;
    }

    .post__bottom{
        display: flex;
        width: 150px;
        padding-top: 5px;  
        font-size: 0.9rem;
        line-height: 1.5;
        border-top: 1px solid #979797;  
    }

    .post__date{
        margin-right: 20px;
        font-style: italic;
        color: #ad6b44;
    }

    .post__btns{
        width: 30%;
        text-align: right;
    }

    .btn--more{
        background: #0a5232;
        margin-right: 10px;
    }

    .btn--delete{   
        background: #7c3b3f;
    }

    @media(max-width: 930px){
        .post__content{
            width: 55%;
        }

        .post__btns{
            width: 45%;
        }
    }
    @media(max-width: 768px){
        .post{
            flex-wrap: wrap;
        }

        .post__content{
            width: 100%;
        }

        .post__btns{
            width: 100%;
            text-align: left;
            margin-top: 20px;
        }
    }
</style>