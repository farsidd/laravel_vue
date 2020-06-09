import Dashboard from './components/Dashboard';
import Profile from './components/Profile'
import Users from './components/Users'
import Home from './components/Home'
import Developers from './components/Developers'
export default {
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            component: Dashboard
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/users',
            component: Users
        },
        {
            path: '/developer',
            component: Developers
        }
        
    ]
};