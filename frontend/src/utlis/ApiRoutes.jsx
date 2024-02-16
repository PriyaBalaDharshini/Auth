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
    },
    FORGOT_PASSWORD: {
        path: "/users/forgotpassword",
        authenticate: false
    },
    UPDATE_PASSWORD: {
        path: "/users/updatepassword",
        authenticate: false

    }
};

export default ApiRoutes;
