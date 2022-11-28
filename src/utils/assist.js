// 由一个组件向上找最近的指定组件
function findComponentUpward(context, componetName) {
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || [componetName].indexOf(name) < 0)) {
    parent = parent.$options.name
  }
  return parent
}

export { findComponentUpward }
