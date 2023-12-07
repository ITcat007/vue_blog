<template>
    <div class="comments__item comment">
        <div class="comment__top">
            <div class="comment__name">{{comment.name}},</div>
            <div class="comment__email">{{comment.email}},</div>
            <div class="comment__date">дата: {{(new Date(comment.date)).toLocaleDateString()}}</div>
        </div>
        <div class="comment__bottom">
            <div class="comment__content">{{comment.text}}</div>
            <div class="comment__btn">
                <button-template class="btn btn--delete"
                    @click="$emit('remove', comment)"
                >
                    Удалить
                </button-template> 
            </div> 
        </div>      
    </div>
</template>

<script>
    export default{
        props: {
            comment: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .comments__item{
        margin-top: 2rem;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        font-family: 'Fira Sans', sans-serif;
        border:1px solid #979797;
        border-radius: 10px;
        overflow: hidden;
        overflow-wrap: break-word;
    }

    .comment__top{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px 20px;
        background-color: #979797;
        font-weight: 600;
        word-break: break-all;
    }

    .comment__bottom{
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .comment__content{
        width: 85%;
    }

    .comment__btn{
        width: 14%;
        display: flex;
        justify-content: flex-end;
    }

    @media(max-width: 768px){      
        .comment__bottom{
            flex-wrap: wrap;
        }

        .comment__content{
            width: 100%;
            margin-bottom: 5px;
        }

        .comment__btn{
            width: 100%;
            justify-content: center;
        }
    }
</style>