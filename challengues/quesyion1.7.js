// implements a function that should return a Promise that resolves to an array of results
// of the functions in the array
// Language: javascript
// Path: quesyion1.7.js
async function runSequentially(functions) {
    // Write your code here
    let results = [];
    for (let i = 0; i < functions.length; i++) {
        results.push(await functions[i]());
    }
    return results;
}

let counter = 1;
function incrementCounterAsync() {
return new Promise((resolve, reject) => {
    counter += 1;
    resolve(counter);
});
}
let promise = runSequentially([incrementCounterAsync, incrementCounterAsync]);
if(promise) {
    promise.then(result => console.log(result))
    .catch(error => console.log("Error: " + error));
}
module.exports.runSequentially = runSequentially;