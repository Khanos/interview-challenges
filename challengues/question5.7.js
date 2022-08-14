// Implemente retryRequest function that executes the getUserInfo function for nrOfTimes times until it succeeds.
async function retryRequest(promiseFunc, nrOfRetries) {
    // Write your code here
    let promiseArr = [];
    for (let i = 0; i < nrOfRetries; i++) {
        promiseArr.push(promiseFunc())
    }
    return Promise.race(promiseArr);
}
        
let hasFailed = false;
function getUserInfo() {
return new Promise((resolve, reject) => {
    if(!hasFailed) {
    hasFailed = true;
    reject("Exception!");
    } else {
    resolve("Fetched user!");
    }
});
}
let promise = retryRequest(getUserInfo, 3);
if(promise) {
promise.then((result) => console.log(result))
.catch((error) => console.log("Error!"));
}
module.exports.retryRequest = retryRequest;