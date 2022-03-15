import AllTests from '@/components/AllTests'
import TestsByCategory from '@/components/TestsByCategory'
import TestsByLevel from '@/components/TestsByLevel'
import Test from '@/components/Test'
import LogIn from '@/components/LogIn'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: LogIn
    },
    {
        path: '/allTests',
        component: AllTests
    },
    {
        path: '/testsByCategory/:id',
        name: 'TestsByCategory',
        component: TestsByCategory
    },
    {
        path: '/testsByLevel/:id',
        name: 'TestsByLevel',
        component: TestsByLevel
    },
    {
        path: '/tests/:testSetId',
        name: 'Tests',
        component: Test
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;