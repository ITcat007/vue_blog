<template>
    <div class="container">
        <header>
            <h1>Добро пожаловать в блог <span>@lets_talkshortly</span></h1>
            <div class="author-image">
                <img src="../assets/author.jpg" alt="author-@talkaboutsmth">
            </div>
        </header>
        <main>
            <button-template class="btn--create"
                @click="showModal"
            >
                Создать пост
            </button-template>
            <modal-form v-model:show="modalOn">
                <post-form @create="createPost"></post-form>
            </modal-form>
            <post-list 
                :posts="posts"
                @remove="removePost"
            ></post-list>
        </main>
    </div>
</template>

<script>
    import PostForm from '../components/PostForm'
    import PostList from '../components/PostList'
    export default {
        components: {
            PostForm, PostList
        },
        data(){
            return{
                posts: [],
                modalOn: false
            }
        },
        mounted(){
            if (localStorage.getItem('posts')) {
                this.posts = JSON.parse(localStorage.getItem('posts'));
            }
        },
        methods: {
            createPost(post){
                this.posts.push(post);
                this.savePostsToLS(); //сохранение в localStorage
                this.modalOn = false;
            },
            removePost(post){
                this.posts = this.posts.filter(p => p.id !== post.id);
                this.savePostsToLS(); //удаление поста из localStorage после его удаления со страницы
            },
            savePostsToLS(){
                localStorage.setItem('posts', JSON.stringify(this.posts));
            },
            showModal(){
                this.modalOn = true;
            }
        }
    }
</script>

<style>
  .container{
    max-width: 1225px;
    margin: auto;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }

  header{
    background: url('../assets/header-background.jpg') no-repeat center center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1{
    font-size: 1.6rem;
    text-transform: uppercase;
  }

  h1 span{
    color: #ad6b44;
    display: block;
    text-transform: lowercase;
    margin-bottom: 3px;
  }

  .author-image{
    width: 100%;
    height: 103px;
  }

  .author-image img{
    border-radius: 15px;
    display: block;
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }

  main{
    margin-top: 200px;
  }

  .btn--create{
    margin-top: 27px;
    padding-left: 70px;
    padding-right: 70px;
    background-color: #0a5232;
    font-size: 17px;
   }

   .btn--create:hover{
     background:#343434;
     transition: background .3s ease;
   }

  @media(max-width: 576px){
    h1{
        font-size: 1.4rem;
    }

    h1 span{
        margin-top: 5px;
    }

    .author-image{
        display: none;
    }

    .btn--create{
        padding-left: 35px;
        padding-right: 35px;
    }
  }
</style>