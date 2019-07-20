export const checkUsername = (username) => {
    console.log("Checking username ...");

    return new Promise((resolve, reject) => setTimeout(() => {
        console.log("Username check has returned!");
        username.includes("micha") ? reject() : resolve();
    }, 500));
};