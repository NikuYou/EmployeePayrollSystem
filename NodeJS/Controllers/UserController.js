const User           = require('../Models/User');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();

exports.Register = async function(req, res) {
    let reqInfo = RequestService.jwtReqHelper(req);
    res.json({errorMessage:"", user:{}, reqInfo:reqInfo})
};

exports.RegisterUser  = async function(req, res){
   
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {

        var newUser = new User({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            email:        req.body.email,
            username:     req.body.username,
            streetAddress:req.body.streetAddress,
            phone:        req.body.phone,
            payroll:      null
        });
    
        User.register(new User(newUser), req.body.password, 
                function(err, account) {
                    if (err) {
                        let reqInfo = RequestService.jwtReqHelper(req);
                        return res.json(
                        { user : newUser, errorMessage: err, 
                          reqInfo:reqInfo });
                    }
                    passport.authenticate('local') (req, res, 
                            function () { res.redirect('/User/Login'); });
                });
    }
    else {
      res.json({ user:newUser, 
              errorMessage: "Passwords do not match.", 
              reqInfo:reqInfo})
    }
};

exports.Login = async function(req, res) {
    let reqInfo      = RequestService.jwtReqHelper(req);
    let errorMessage = req.query.errorMessage; 

    res.json({ user:{}, errorMessage:errorMessage, 
                               reqInfo:reqInfo});
}

exports.LoginUser = async function(req, res, next) {
    let roles = await _userRepo.getRolesByUsername(req.body.username);
    sessionData = req.session;
    sessionData.roles  = roles;
  
    passport.authenticate('local', {
        successRedirect : '/User/Profile', 
        failureRedirect : '/User/Login?errorMessage=Invalid login.', 
    }) (req, res, next);
  };
  
exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.jwtReqHelper(req);

    res.json({ user:{}, isLoggedIn:false, errorMessage : "", 
                               reqInfo:reqInfo});
};

exports.Profile  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req);

    if(reqInfo.authenticated) {
        res.json( {errorMessage:"", reqInfo:reqInfo, user:reqInfo.user})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}

exports.Employees  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, ['Manager','HR']);
    let users = await _userRepo.getUsers();

    newusers = [];
    for (user in users) {
        newusers.push(JSON.parse(JSON.stringify(users[user])));
        newusers[user].payroll ="x";
    }
    users = newusers;
    if(reqInfo.rolePermitted) {
        res.json( {errorMessage:"", reqInfo:reqInfo, users:users})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in with proper permissions to view this page.')
    }
}

exports.Payroll  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req,['HR']);
    let users = await _userRepo.getUsers();

    if(reqInfo.rolePermitted) {
        res.json({errorMessage:"", reqInfo:reqInfo, users:users})
    }
    else {
        res.json( {errorMessage:'/User/Login?errorMessage=You ' +
                'must be logged in with proper permissions to view this page.'})
    }
}

exports.UpdateProfile = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    let user = req.body.obj;
  
    let tempUserObj = new User({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      streetAddress: user.streetAddress,
      email: user.email,
      phone: user.phone
    });
    let responseObject = await _userRepo.updateUser(tempUserObj);
    if (responseObject.errorMessage == "") {
      res.json({
        reqInfo: reqInfo,
        user: responseObject.obj,
        errorMessage: ""
      });
    }
    else {
      res.json({
        errorMessage: responseObject.errorMessage,
        reqInfo: reqInfo,
        user: reqInfo.user
      });
    }
  };

  exports.UpdateSalary = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    let user = req.body.obj;
  
    let tempUserObj = new User({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      streetAddress: user.streetAddress,
      email: user.email,
      phone: user.phone,
      payroll:user.payroll
    });
    let responseObject = await _userRepo.updateSalary(tempUserObj);
    if (responseObject.errorMessage == "") {
      res.json({
        reqInfo: reqInfo,
        user: responseObject.obj,
        errorMessage: ""
      });
    }
    else {
      res.json({
        errorMessage: responseObject.errorMessage,
        reqInfo: reqInfo,
        user: reqInfo.user
      });
    }
  };

  exports.SecureAreaJwt  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req,['Manager','HR']);

    if(reqInfo.authenticated) {
        res.json({secureData: reqInfo.roles})
    }

}
