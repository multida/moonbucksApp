const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu)); //JSON.stringify 문자열로 변환
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu")); //다시 JSON의 형태로 바꿔줌
  },
};

export default store;
