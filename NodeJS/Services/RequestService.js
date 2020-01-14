// Allowed to use 'class' structure on server if
// "use strict included."
"use strict";
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();


class RequestService {
    constructor() {
    }

    async  jwtReqHelper(req, permittedRoles=[]) {
        let rolePermitted = false;

        // Send username and login status to view if authenticated.
        if(req.isAuthenticated()) {
            let roles = await _userRepo.getRolesByUsername(req.user.username);
            let user = await _userRepo.getUserByUsername(req.user.username);

            if(permittedRoles.length > 0) {
                // Check for overlap between user's role array with roles
                // permitted for the controller.

                if(roles.length > 0) {
                    let matchingRoles = roles.filter( x=>permittedRoles.includes(x));
                    if(matchingRoles.length > 0) {
                        rolePermitted = true;
                    }
                    return { authenticated: true, username : req.user.username,
                        roles:roles, rolePermitted:rolePermitted,user:user};
                }
            }
            return { authenticated: true, username : req.user.username, roles:[],
                rolePermitted:rolePermitted, user:user};
        }
        // Send logged out status to form if not authenticated.
        else {
            return { authenticated: false };
        }
    }
}
module.exports = new RequestService();
