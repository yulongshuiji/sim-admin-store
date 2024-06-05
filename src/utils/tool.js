export function findMenuListById(list, id) {
  let result = null;

  // 定义递归函数
  function recursiveSearch(arr, targetId) {
    for (let item of arr) {
      if (item.key === targetId) {
        result = arr; // 找到目标数组，赋值给result
        return;
      } else if (item.children) {
        recursiveSearch(item.children, targetId); // 递归查找子节点
      }
    }
  }

  // 调用递归函数
  recursiveSearch(list, id);

  return result;
}
