<template>
    <div class="container">
        <header>
            <h1>Добро пожаловать в блог <span>@lets_talkshortly</span></h1>
            <div class="author-image">
                <img src="../assets/author.jpg" alt="author-@talkaboutsmth">
            </div>
        </header>
        <main>
            <div class="post__content">
                <div v-if="isEdited">
                    <div class="post__title">Тема: <span>{{ changedPost.title }}</span></div>
                    <div class="post__text">{{ changedPost.quicktext }}</div>
                    <div class="post__text">{{ changedPost.fulltext }}</div>
                    <div class="post__date">{{(new Date(changedPost.date)).toLocaleDateString()}}</div>
                </div>
                <div v-else v-for="post in posts" :key="post.id">
                    <div class="post__title">Тема: <span>{{ post.title }}</span></div>
                    <div class="post__text">{{ post.quicktext }}</div>
                    <div class="post__text">{{ post.fulltext }}</div>
                    <div class="post__date">{{(new Date(post.date)).toLocaleDateString()}}</div>
                
                </div>
            </div>
            <button-template class="btn btn--edit"
                @click="showModal"
            >
                Редактировать
            </button-template>
            <modal-form v-model:show="modalOn">
                <edit-form :post="post" :changedPost="changedPost" :changeP="changePost" :resetCh="resetChanges"></edit-form>
            </modal-form>
            <div class="comments__field">
                <div class="comments__title">Оставить комментарий</div>
                <feedback-form :postnumber="post.id" @send="sendComment"></feedback-form>
                <comments-list 
                    :singlePostComments="singlePostComments"
                    @remove="removeComment"
                ></comments-list>
            </div>
        </main>
    </div>
</template>

<script>
    import { useRoute } from 'vue-router'; //импорт, чтобы достать id поста
    import EditForm from '../components/EditForm'
    import FeedbackForm from '../components/FeedbackForm'
    import CommentsList from '../components/CommentsList'
    export default{
        components: {EditForm, FeedbackForm, CommentsList},
        data(){
            return{
                posts: '',
                post: '',
                modalOn: false,
                changedPost: '',
                isEdited: false,
                comments: [],
                singlePostComments: []
            }
        },
        mounted() {
            if (localStorage.getItem('posts')) {
                this.posts = JSON.parse(localStorage.getItem('posts'));
                this.posts = this.posts.filter(p => p.id == useRoute().params.id);
            }
            for (let i = 0; i < this.posts.length; i++){                        
                this.post = this.posts[i];     
                console.log(this.post)
            }
            if (localStorage.getItem('comments')) {
                this.comments = JSON.parse(localStorage.getItem('comments'));
                this.singlePostComments = this.comments.filter(c => c.postId == this.post.id)
            }           
        },
        methods:{
            showModal(){
                this.modalOn = true;
            },
            changePost(editedPost){
                this.changedPost = editedPost;
                const today = new Date();
                const postDate = (today.getFullYear()) +'-'+ (today.getMonth()+1) +'-'+ (today.getDate());
                this.changedPost.date = postDate;  
                console.log(typeof this.changedPost)
                console.log(this.post)
                                
                if(this.changedPost.title !== this.post.title || this.changedPost.quicktext !== this.post.quicktext || this.changedPost.fulltext !== this.post.fulltext){
                    this.isEdited = true;
                    this.modalOn = false;
                }          

                let parsed = JSON.parse(localStorage.getItem("posts"));
                for(let i = 0; i < parsed.length; i++){                    
                    if(parsed[i].title == this.post.title){
                        let indexOfOldVer = parsed.indexOf(parsed[i]);
                        parsed.splice(indexOfOldVer, 1)
                        parsed.push(this.changedPost);
                        localStorage.setItem('posts', JSON.stringify(parsed));
                    }                   
                }
                window.location.reload();
            },
            resetChanges(){
                this.modalOn = false;
            },
            sendComment(comment){
                this.comments.push(comment);
                this.saveCommentsToLS();                
                this.comments = JSON.parse(localStorage.getItem('comments'));
                this.singlePostComments = this.comments.filter(c => c.postId == this.post.id)
            },
            removeComment(comment){
                const removingComment = this.singlePostComments.filter(c => c.id == comment.id);
                this.singlePostComments = this.singlePostComments.filter(c => c.id !== comment.id);
                console.log(removingComment[0].id)
                console.log(this.comments)
                console.log(this.singlePostComments)
                const temp = this.comments.find(c => c.id == removingComment[0].id)
                console.log(this.comments.indexOf(temp))
                this.comments.splice(this.comments.indexOf(temp), 1);
                localStorage.setItem('comments', JSON.stringify(this.comments));
            },
            saveCommentsToLS(){
                localStorage.setItem('comments', JSON.stringify(this.comments));
            }
        }
    }
</script>


<style scoped>
    main{
        margin-top: 19rem;
    }

    .btn--edit{
        margin-top: 1.6rem;
    }

    .post__content{
        width: 100%;
        padding: 35px;
        border: 2px solid #979797;
        border-radius: 10px;
        text-align: justify;
        font-size: 1.1rem;
    }

    .post__title{
        margin-bottom: 2rem;
    }

    .post__text:nth-child(2){
        margin-bottom: 1.3rem;
        color: #343434;
        font-style: italic;
    }

    .comments__field{
        padding-bottom: 2rem;
        text-align: left;
    }

    .comments__title{
        margin-top: 30px;
        margin-bottom: 25px;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 700;
        color: #343434;;
    }

    @media(max-width: 576px){
        main{
            text-align: left;
            margin-top: 16rem;
        }

        .post__content{
            font-size: 1rem;
        }
       
        .btn--edit{
            margin-top: 0.8rem;
        }
    }
</style>