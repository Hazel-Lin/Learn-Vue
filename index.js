// 响应式系统学习
// 1、什么是响应式系统？
// 当一个是变量的值发生改变时，依赖这个变量的其他变量同时会发生改变。
// a 简单理解
// let a = 10
// let b = a + 1
// console.log(b) // 11

// a = 11
// b = a + 1
// console.log(b) // 12

// b 封装成函数形式 每一次a的改变都去调用一次依赖a的函数
// let a = 10
// b = depA()
// console.log(b) // 11
// a = 11
// b = depA()
// console.log(b) // 12
// function depA(){
//   return a + 1
// }

// V3中的做法 通过reactive 和 effect 实现响应式
// 当a发生变化时，b自动发生变化 不需要手动调用
// const { reactive,effect } = require( '@vue/reactivity') 
// let a = reactive({
//   value:10
// });
// let b;
// // effect函数会先执行一次
// effect(()=>{
//   b = a.value + 1
//   console.log(b) 
// })
// a.value = 11


// 模拟V3的做法
const { reactive,effect } = require('./myReactivity.js') 
let a = reactive({
  value:10,
});

let b;
// effect(()=>{
//   b = a.value + 1
// })
// console.log(b) // 11
// a.value = 11
// console.log(b) // 12








// v2中的做法

