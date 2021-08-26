interface User {
    name: string;
    lastName: string;
    password: string;
    email: string;
}

interface UserBoolean {
    name: boolean;
    lastName: boolean;
    password: boolean;
    email: boolean;
}

interface UserValidation extends UserBoolean {
    valid: boolean;
}

interface UserLogin {
    email: string;
    password: string;
}

interface UserLoginValidation {
    email: boolean;
    password: boolean;
    valid: boolean;
}

function IsNameValid(name: string): boolean {
    // this function validates the name useing the API's validations
    if (typeof name !== "string" || name.length < 2 || name.length > 20) return false;
    // the name must not contain the following characters:
    //  <, >, &, ', " and \
    const re = /[<>&'\"\\]/g;
    if (re.test(name)) return false;
    return true;
}

// function for lastname validation
function IsLastNameValid(lastName: string): boolean {
    if (typeof lastName !== "string" || lastName.length < 2 || lastName.length > 30) return false;
    // the lastName must not contain the following characters:
    //  <, >, &, ', " and \
    const re = /[<>&'\"\\]/g;
    if (re.test(lastName)) return false;
    return true;
}

// function for email validation 
function IsEmailValid(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// function for password validation
function IsPasswordValid(password: string): boolean {
    if (typeof password !== "string" || password.length < 6 || password.length > 20) return false;

    // the password must not contain spaces
    if (password.indexOf(' ') !== -1) return false;
    return true;
}

function AreAllFieldsValid(user: User): boolean {
    if (!IsNameValid(user.name)) return false;
    if (!IsLastNameValid(user.lastName)) return false;
    if (!IsEmailValid(user.email)) return false;
    if (!IsPasswordValid(user.password)) return false;
    return true;
}

// validation for all fields
function AreTheFieldsValid(user: User): UserValidation {
    const fieldsValidation: UserValidation = {
        name: IsNameValid(user.name),
        lastName: IsLastNameValid(user.lastName),
        password: IsPasswordValid(user.password),
        email: IsEmailValid(user.email),
        valid: AreAllFieldsValid(user)
    };
    return fieldsValidation;
}

// validation for login fields

function AreAllTheLoginFieldsValid(user: UserLogin): boolean {
    if (!IsEmailValid(user.email)) return false;
    if (!IsPasswordValid(user.password)) return false;
    return true;
}

function AreTheLoginFieldsValid(user: UserLogin): UserLoginValidation {
    const fieldsValidation: UserLoginValidation = {
        email: IsEmailValid(user.email),
        password: IsPasswordValid(user.password),
        valid: AreAllTheLoginFieldsValid(user)
    };
    return fieldsValidation;
}

export { User, UserBoolean, UserValidation, UserLogin, UserLoginValidation, AreAllFieldsValid, AreTheFieldsValid, IsEmailValid, IsPasswordValid, IsNameValid, IsLastNameValid, AreAllTheLoginFieldsValid, AreTheLoginFieldsValid };