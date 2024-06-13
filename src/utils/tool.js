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

function getCurrentFormattedTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
