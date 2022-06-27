// 创建一个响应式系统

// 创建一个全局对象Map
// let allTargetMap = new Map()
// 代码结构优化
let allTargetMap = new WeakMap()
// 创建一个全局变量 存放当前的handle
let currentHandle = null

// 首先创建一个依赖收集类
class Dependence {
  constructor(){
    this.effectSet = new Set()
  }
  // 收集依赖
  collectDep(){
    currentHandle && this.effectSet.add(currentHandle)
  }
  // 触发依赖
  notice(){
    this.effectSet.forEach(effect =>{
      effect()
    })
  }
}
/**
 * @description 依赖收集函数
 * @param {*} target
 * @param {*} key
 * @returns {*}  
 */
function getDeps(target,key){
  // 需要做一次依赖收集 收集针对的是一个reactive对象 并且对象中的每个key都有自己的依赖
  // 但在开发中不一定只存在一个reactive对象 因此需要创建一个Map去放置所有对象的依赖
  // 在这个全局Map对象中 获取某一个对象的依赖allTargetDepMap也是一个Map对象
  let allTargetDepMap = allTargetMap.get(target)
  if(!allTargetDepMap){
    allTargetDepMap = new Map()
    allTargetMap.set(target,allTargetDepMap)
  }
  // 在该对象的依赖中获取某一个具体key的依赖
  let keyDeps = allTargetDepMap.get(key)
  if(!keyDeps){
    keyDeps = new Dependence()
    allTargetDepMap.set(key,keyDeps)
  }
  return keyDeps
}

// 创建一个响应式数据
function reactive (rawObj){
  return new Proxy(rawObj,{
    get(target,key){
      let keyDeps = getDeps(target,key)
      // 获取到具体依赖并保存至一个依赖收集容器中
      keyDeps.collectDep()
      return Reflect.get(target,key)
    },
    set(target,key,value){
      const r = Reflect.set(target,key,value)
      let keyDeps = getDeps(target,key)
      keyDeps.notice()
      return r
    }
  })
}

// handle实际上就是一个函数 handle一开始会执行一次
// 收集的依赖就是effect函数中的handle 那么如何调用依赖收集类中的collectDep方法把handle添加到对应的依赖中呢？
function effect(handle){
  currentHandle = handle
  handle()
  currentHandle = null
}


module.exports = {
  reactive,
  effect
};