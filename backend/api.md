# account

### setDisplayName

Login required

parameters:
- display_name(string): The new display Name

function:
- Change the display name of the active account

returns:
- [200] string: new displayName
- [500] string: "invalid input"

### setPassword

Login required

parameters:
- password(string): The old password
- newPassword(string): The new password

function:
- Change the password of the active account

returns:
- [200] string: "Password Changed Succesfully"
- [500] string: "Invalid input"
- [401] string: "Invalid password" (provided password is incorrect)

### login

parameters:
- username(string)
- password(string)

functions:
- Log user into system (save cookie)

returns:
- [200] string: "Invalid credentials"
- [401] object: {username, display_name}

### signup

parameters:
- username(string)
- password(string)
- display_name(string)

functions:
- Create aan account in the system, and log in (create cookie)

returns:
- [403] string: "Username already exists"
- [500] string: "Invalid input"
- [200] object: {username. display_name}

### logout

Login required

functions:
- Log out the user (remove cookie)

returns:
- [200] string: "Logout successful"

# changelog

Login required

functions:
- Get the changelog log (file in master root)

returns:
- [200] JSON: changelog