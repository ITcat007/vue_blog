import PostsPage from '../pages/PostsPage'
import PostPage from '../pages/PostPage'
import { createRouter, createWebHistory } from "vue-router"
    
const routes = [
    {
        path : "/",
        component : PostsPage
    },
    {
        path : "/:id",
        component : PostPage
    }
]

const router = createRouter({
    routes,
    history : createWebHistory()

})

export default router;