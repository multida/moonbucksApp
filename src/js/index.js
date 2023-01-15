/**
 * @TODO localStorage Read & Write
 * - [X] localStorage에 데이터를 저장한다.
 *  - [X] 메뉴를 추가할 때
 *  - [X] 메뉴를 수정할 때
 *  - [X] 메뉴를 삭제할 때
 * - [X] localStorage에 있는 데이터를 읽어온다.
 *
 * @TODO 카테고리별 메뉴판 관리
 * - [ ] ☕ 에스프레소 메뉴판 관리
 * - [ ] 🥤 프라푸치노 메뉴판 관리
 * - [ ] 🍹 블렌디드 메뉴판 관리
 * - [ ] 🫖 티바나 메뉴판 관리
 * - [ ] 🍰 디저트 메뉴판 관리
 *
 * @TODO 페이지 접근시 최초 데이터 Read & Rendering
 * - [ ] 페이지 최초 로딩 시 localStorage에 담겨 있는 에스프레소 메뉴를 읽어온다.
 * - [ ] 에스프레소 메뉴를 페이지에 그려준다.
 *
 * @TODO 품절 상태 관리
 * - [ ] 품절 버튼을 추가 (.sold-out)
 * - [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
 * - [ ] 클릭 이벤트에서 가장 가까운 li 태그에 sold-out을 추가한다.
 */

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu)); //JSON.stringify 문자열로 변환
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu")); //다시 JSON의 형태로 바꿔줌
  },
};

function App() {
  // 상태(변하는 데이터) - 메뉴명
  this.menu = []; //초기화를 해주는게 좋다. ( 어떤 형태로 받아오는지 알려줌. )
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu
      .map((item, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
        `;
      })
      .join(""); //["<li></li>", "<li></li>", "<li></li>"] 이렇게 나온걸 join으로 하나로 붙여줌

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메시지를 입력해주세요");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName }); //새로운 객체를 담는다?
    store.setLocalStorage(this.menu);
    render();

    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "메뉴 이름을 수정하시겠습니까?",
      $menuName.innerText
    );

    this.menu[menuId].name = editedMenuName;
    store.setLocalStorage(this.menu);
    /* *
     * @TODO 취소를 눌렀을때 체크해주기
     */
    // if (editedMenuName === null || editedMenuName === undefined) {
    //   console.log($menuName.value);
    // }
    $menuName.innerText = editedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      //splice -> 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경

      // *@TODO 삭제할때 index 값이 이상함
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  //메뉴 수정, 삭제하기
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  //form 태그가 자동으로 전송되는걸 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //메뉴 입력 받기 ( 확인 버튼을 눌렀을때)
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  //메뉴 입력 받기 (Enter key를 눌렀을때)
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      //빈값일때 얼럿창을 띄워주누는 아래 if에서 글씨 하나 치면 얼럿창 나와서
      return;
    }
    addMenuName();
  });
}

const app = new App();
app.init();
