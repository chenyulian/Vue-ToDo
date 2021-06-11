// 生成Id的方法，前端临时用

let id: number = parseInt(window.localStorage.getItem("_idMax") || '0') || 0;

function createId() {
  id++;
  window.localStorage.setItem("_idMax", id.toString());
  return id;
}

export default createId;
