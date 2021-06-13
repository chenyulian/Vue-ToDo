// 生成Id的方法，前端临时用

// let id: number = parseInt(window.localStorage.getItem("_idMax") || '0') || 0;

function createId(typeName:string) {
  const name = `_${typeName}IdMax`;
  let id = parseInt(window.localStorage.getItem(name) || '0') || 0;
  id++;
  window.localStorage.setItem(name, id.toString());
  return id;
}

export default createId;
