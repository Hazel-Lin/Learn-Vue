/**
 * 如何实现一个响应式对象？
 * v3中通过Proxy对象获取到原对象的代理 实现拦截操作
 * 什么是响应式系统？
 * 当一个对象中key的值被读取时 收集该对象中key所对应的依赖
 * 同时，当这个key的值被修改时 触发该key所对应的依赖
 * 简而言之 先收集依赖 再触发依赖
 */
const reactive = function (Object){
  return new Proxy(Object,{
    // 读取操作
    get(targetObj,key){
      console.log('get',targetObj,key)
      return targetObj[key]
    },
    // 更新操作
    set(targetObj,key,value){
      console.log('set',targetObj,key,value)
      return targetObj[key] = value
    }
  })
}
const effect = function (){
  
}
module.exports = {
  reactive,
  effect
};