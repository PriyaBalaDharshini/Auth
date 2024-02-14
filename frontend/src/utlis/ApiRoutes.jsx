const ApiRoutes = {
    SIGN_IN: {
        path: "/users/addUser",
        authenticate: false
    },
    LOG_IN: {
        path: "/users/login",
        authenticate: false
    },
    DASHBOARD: {
        path: '/',
        authenticate: true
    }

}
export default ApiRoutes