<template>
    <div class="comments">
        <div v-if="singlePostComments.length > 0">
            <h3>Комментарии</h3>
            <comment-item 
                v-for="comment in singlePostComments" 
                :key="comment.id"
                :comment="comment"
                @remove="$emit('remove', comment)"
            >
            </comment-item>
        </div>
        <h3 v-else> Здесь пока нет ни одного комментария...</h3>
    </div>
</template>

<script>
    import CommentItem from './CommentItem';
    export default{
        components: {CommentItem},
        props: {
            singlePostComments: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    .comments{
        margin-top: 3rem;
    }

    .comments h3{
        text-align: center;
    }
</style>