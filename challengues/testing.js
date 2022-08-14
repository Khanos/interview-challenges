const firstPromise = new Promise((resolve, reject) => {
    resolve('this is a test 1')
});
const secondPromise = new Promise((resolve, reject) => {
    reject('this is a test 2')
});
const thirdPromise = new Promise((resolve, reject) => {
    resolve('this is a test 3')
});

Promise.race([
    firstPromise,
    secondPromise,
    thirdPromise
]).then(messages => {
    console.log(`messages: `, messages);
}).catch(e => {
    console.log(e)
})