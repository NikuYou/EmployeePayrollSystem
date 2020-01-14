const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async getUserByUsername(username) {
        var user = await User.findOne({username: username});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRolesByUsername(username) {
        var user = await User.findOne({username: username}, {_id:0, roles:1});
        if(user.roles) {
            return user.roles;
        }
        else {
            return [];
        }
    }    

    async getUsers() {
        let users = await User.find().exec();
        return users;
    }

    async updateUser(editedObj) {
        let response = {
          obj: editedObj,
          errorMessage: ""
        };    
        try {
          var error = await editedObj.validateSync();
          if (error) {
            response.errorMessage = error.message;
            return response;
          }
          let userObject = await this.getUserByUsername(editedObj.username);
          if (userObject) {
            let updated = await User.updateOne(
              { username: editedObj.username }, 
              {
                $set: {
                  username: editedObj.username,
                  firstName: editedObj.firstName,
                  lastName: editedObj.lastName,
                  streetAddress: editedObj.streetAddress,
                  phone: editedObj.phone,
                  email: editedObj.email
                }
              }
            );    
            if (updated.nModified != 0) {
              response.obj = editedObj;
              return response;
            }
            else {
              respons.errorMessage =
                "An error occurred during the update. Changes did not save.";
            }
            return response;
          }
          else {
            response.errorMessage = "Error finding this user's infromation.";
          }
          return response;
        } catch (err) {
          response.errorMessage = err.message;
          return response;
        }
      }

      async updateSalary(editedObj) {
        let response = {
          obj: editedObj,
          errorMessage: ""
        };    
        try {
          var error = await editedObj.validateSync();
          if (error) {
            response.errorMessage = error.message;
            return response;
          }
          let userObject = await this.getUserByUsername(editedObj.username);
          if (userObject) {
            let updated = await User.updateOne(
              { username: editedObj.username }, 
              {
                $set: {
                  payroll: editedObj.payroll
                }
              }
            );    
            if (updated.nModified != 0) {
              response.obj = editedObj;
              return response;
            }
            else {
              respons.errorMessage =
                "An error occurred during the update. Changes did not save.";
            }
            return response;
          }
          else {
            response.errorMessage = "Error finding this user's infromation.";
          }
          return response;
        } catch (err) {
          response.errorMessage = err.message;
          return response;
        }
      }
}
module.exports = UserRepo;

