let logInTime = 0;

const loggedIn = () => {
    logInTime = (Date.now()/1000);
}

const checkSessionExpiry = () => {
    if(((Number(process.env.TOKEN_EXPIRY)) + logInTime) < (Date.now()/1000)){
        return true;
    }
    else{
        return false;
    }
}

export {loggedIn, checkSessionExpiry}