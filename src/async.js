
const getApi = async () => {
  return new Promise((resolve) => {
    resolve('data')
  })
}

const data = await getApi();
console.log(data);