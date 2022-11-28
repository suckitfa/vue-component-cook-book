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

// 由一个组件，向下查找最近的指定组件
function findComponentDownward(context,componetName) {
  // context.$children 得到的是当前组件的全部子组件，所以需要遍历一遍，
  const childrens = context.$children;
  let children = null;
  if (childrens.length) {
    for(const child of childrens) {
      const name = child.$options.name;
  
      if (name === componetName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child,componetName);
        if(children) break;
      }
    }
  }
  return children;
}

// 由一个组件，向下找到所有指定的组件
function findComponentsDownward(context,componetName) {
  return context.$children.reduce((components,child) => {
    if(child.$options.name === componetName) components.push(child)
    const foundChilds = findComponentsDownward(child,componetName);
    return components.concat(foundChilds);
  },[]);
}

// assist.js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export { 
    findComponentUpward,
    findComponentUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}
