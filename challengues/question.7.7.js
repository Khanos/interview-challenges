// implemente getInParallel that should be used to invoke multiple API calls in parallel. The function accepts an array of funtions that return Promises. The funciont should return a Promise wich resolve to an array of results from the apiCalls argumnet 
function getInParallel(apiCalls) {
    // Write your code here
    return new Promise((resolve, reject) => {
        let results = [];
        let promises = [];
        apiCalls.forEach(el => {
            promises.push(el());
        }
        );
        Promise.all(promises).then(response => {
            response.forEach(el => {
                results.push(el);
            }
            );
            resolve(results);
        }).catch(error => {
            reject(error);
        }
        );
    });
  }
  
  let promise = getInParallel([() => Promise.resolve("First API call!"),
                               () => Promise.resolve("Second API call!")]);
  if(promise) {
    promise.then((result) => console.log(result)).catch((err) => console.log(err));
  }
  module.exports.getInParallel = getInParallel;