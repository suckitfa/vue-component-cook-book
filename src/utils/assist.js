// 由一个组件向上找最近的指定组件
function findComponentUpward(context, componetName) {
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || [componetName].indexOf(name) < 0)) {
    parent = parent.$options.name
  }
  return parent
}

// 由当前组件向上查找所有的指定名称的组件
function findComponentsUpward(context,componetName) {
  let parents = [];
  const parent = context.$parent;

  if(parent) {
    if(parent.$options.name === componetName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent,componetName));
  } else {
    return [];
  }
}

export { findComponentUpward,findComponentUpward }
