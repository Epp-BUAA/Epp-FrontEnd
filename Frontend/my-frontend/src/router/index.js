import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(`@/views/layout/LayoutContainer.vue`)
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(`@/views/login/index.vue`),
            meta: {
                title: '登录页'
            }
        }
    ]
})

router.beforeEach((to) => {
    if (!store.getters.isManagerLogin && to.path !== '/login') return '/login'
})

export default router
