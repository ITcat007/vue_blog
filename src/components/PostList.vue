<template>
    <div class="posts" v-if="posts.length > 0">
        <h2>Посты автора</h2>
        <post-item 
            v-for="post in posts" 
            :key="post.id"
            :post="post"
            @remove="$emit('remove', post)"
        >
        </post-item>
    </div>
    <h3 v-else> Здесь пока никто ничего не писал...</h3>
</template>

<script>
    import PostItem from './PostItem';
    export default{
        components: {PostItem},
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    .posts{
        margin-bottom: 2rem;
    }
    
    h2{
        margin-top: 3.8rem;
        font-family: 'Fira Sans', sans-serif;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: #343434;
    }

    h3{
        margin-top: 2rem;
    }
</style>