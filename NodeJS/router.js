var UserController   = require('./Controllers/UserController');
const authMiddleware = require('./authHelper')
const cors           = require('cors');


// Routes
module.exports = function(app){  

    // Main Routes  

    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    // Sign in
    app.post(
        '/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
    )

    app.get('/User/Profile', cors(),
        authMiddleware.requireJWT, UserController.Profile)

    app.get('/User/Employees', cors(),
        authMiddleware.requireJWT, UserController.Employees)

    app.get('/User/Payroll', cors(),
        authMiddleware.requireJWT, UserController.Payroll)
    
    app.get('/User/SecureAreaJwt', cors(),  
        authMiddleware.requireJWT, UserController.SecureAreaJwt)

    app.post('/User/UpdateProfile', cors(),
        authMiddleware.requireJWT, UserController.UpdateProfile)

    app.post('/User/UpdateSalary', cors(),
        authMiddleware.requireJWT, UserController.UpdateSalary)

};
