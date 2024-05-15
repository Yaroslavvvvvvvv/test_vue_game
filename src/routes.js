import { createMemoryHistory, createRouter } from 'vue-router'




const routes = [

    {
        path: '/',
        name: 'signin',
        component: () => import('./components/SignIn.vue'),

    },
    {
        path: '/game',
        name: 'game',
        component: () => import('./components/MyGame.vue'),
        meta: {
            auth: false
        }
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;