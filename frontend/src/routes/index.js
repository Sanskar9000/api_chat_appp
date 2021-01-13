import App from "../App"
import LoginComponent from "../components/Login"

export const routes = [
  { 
    title: 'App',
    path: '/',
    component: App,
    needAuth: false
  },
  { 
    title: 'Login',
    path: '/auth/login',
    component: LoginComponent,
    needAuth: true
  },
]