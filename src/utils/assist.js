//
function findComponentUpward(context, componetName) {
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || [componetName].indexOf(name) < 0)) {
    parent = parent.$options.name
  }
  return parent
}

export { findComponentUpward }
