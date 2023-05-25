import { createRouter , createWebHistory} from "vue-router";
import TableView from '../views/TableView.vue'
import FormView from '../views/FormView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import filterview from '../views/filterview.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "signup",
            component: SignUp
        },

        {
            path: "/add",
            name: "add",
            component: FormView
        },
        
        {
            path: "/edit/:index",
            name: "edit",
            component: FormView
        },
        
        {
            path: "/tasklist",
            name: "tasklist",
            component: TableView
        },

        {
            path: "/login",
            name: "login",
            component: LogIn
        },
        {
            path: "/filter",
            name: "filter",
            component: filterview
        },
        
    ]
})

export default router;