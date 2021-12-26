
new Promise((resolve, reject) => {
  resolve('success')
})
.then((v) => {
  console.log(`then : ${v}`);
})
.catch((v) => {
  console.log(`catch : ${v}`);
})
.finally(() => {
  console.log(`finally`)
})

