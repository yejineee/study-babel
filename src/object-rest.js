const {a, ...rest} = {a: 'a', b :'b', 'c': 'c'};
console.log(a); // a
console.log(rest); // { b: 'b', c: 'c' }