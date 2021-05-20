
// 保存数据到 sessionStorage
export function setItem(key, value) {
  sessionStorage.setItem(key, value)
}

// 从 sessionStorage 获取数据
export function getItem(key) {
  return sessionStorage.getItem(key)
}
// 从 sessionStorage 删除保存的数据
export function removeItem(key) {
  sessionStorage.removeItem(key)
}

// 从 sessionStorage 删除所有保存的数据
export function clearAllItem() {
  sessionStorage.clear()
}
