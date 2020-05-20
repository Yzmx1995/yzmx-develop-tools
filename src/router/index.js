import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'page@Index',
            meta: { name: 'Index' },
            component: () =>
                import('@/pages/Index/Index.vue')
        },
        {
            path: '/typeset',
            name: 'page@Typeset',
            meta: { name: 'Typeset' },
            component: () =>
                import('@/pages/Typeset/Index.vue')
        },
        {
            path: '*',
            name: 'error@NotFoundPage',
            component: () =>
                import('@/pages/Error.vue')
        }
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.name) {
        document.title = 'Yzmx-' + to.meta.name;
    } else {
        document.title = 'Yzmx';
    }
    next();
});

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        setTimeout(() => {
            document.documentElement.scrollTo(0, 0);
            window.scrollTo(0, 0);
        }, 20)
    })
});

export default router;