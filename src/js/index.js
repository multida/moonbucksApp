import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import MenuApi from "./api/index.js";

//TODO 서버 요청 부분
// - [x] 웹 서버를 띄운다.
// - [x] 서버에 새로운 메뉴가 추가될 수 있도록 요청한다.
// - [x] 서버에 카테고리별 메뉴 리스트를 불러온다.
// - [x] 서버에 메뉴가 수정될 수 있도록 요청한다.
// - [x] 서버에 메뉴의 품절 상태가 토글될 수 있도록 요청한다.
// - [x] 서버에 메뉴가 삭제될 수 있도록 요청한다.

//TODO 리팩토링
// - [x] localStorage에 저장하는 로직은 지운다.
// - [x] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

//TODO 사용자 경험
// - [x] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// - [x] 중복되는 메뉴는 추가할 수 없다.

// 순서
// 1. 웹서버 띄우기
// 2. BASE_URL 웹 서버 변수 먼저 선언
// 3. 비동기 처리하는데 해당하는 부분이 어디인지 확인하고, 웹서버에 요청하게끔 코드 짜기
// 4. 서버에 요청한 후 데이터를 받아서 화면에 렌더링 하기
// 5. 리팩토링 - localStorage 부분 지우고 API 파일 따로 만들어서 진행, 페이지 렌더링과 관련해서 중복되는 코드 줄이기

function App() {
  // 상태(변하는 데이터) - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }; //초기화를 해주는게 좋다. ( 어떤 형태로 받아오는지 알려줌. )
  this.currentCategory = "espresso";
  this.init = async () => {
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    const template = this.menu[this.currentCategory]
      .map((item) => {
        return `
        <li data-menu-id="${
          item.id
        }" class="menu-list-item d-flex items-center py-2">
          <span class="${
            item.isSoldOut ? "sold-out" : ""
          } w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = async () => {
    if ($("#menu-name").value === "") {
      alert("메시지를 입력해주세요");
      return;
    }
    const duplicatedItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === $("#menu-name").value
    );
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-name").value = "";
      return;
    }

    const menuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value = "";
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "메뉴 이름을 수정하시겠습니까?",
      $menuName.innerText
    );
    await MenuApi.updateMenu(this.currentCategory, editedMenuName, menuId);
    render();
    // this.menu[this.currentCategory][menuId].name = editedMenuName;
    // store.setLocalStorage(this.menu);
    /* *
     * @TODO 취소를 눌렀을때 체크해주기
     */
    // if (editedMenuName === null || editedMenuName === undefined) {
    //   console.log($menuName.value);
    // }
  };

  const removeMenuName = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      //this.menu[this.currentCategory].splice(menuId, 1);
      //splice -> 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경

      // *@TODO 삭제할때 index 값이 이상함
      // store.setLocalStorage(this.menu);
      render();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;

    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
    // this.menu[this.currentCategory][menuId].soldOut = true; -> 이건 무조건 품절로만 됨.
    //this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut; //toggle 역할을 해줌. 품절 껐다켰다 가능
    // store.setLocalStorage(this.menu);
  };

  const changeCategory = (e) => {
    e.preventDefault();
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  //addEventListener 한군데로
  const initEventListeners = () => {
    //메뉴 수정, 삭제하기
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return; //체크할게 없으면 return값을 넣어주는게 좋다.
      }
    });

    //form 태그가 자동으로 전송되는걸 막기
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    //메뉴 입력 받기 ( 확인 버튼을 눌렀을때)
    $("#menu-submit-button").addEventListener("click", addMenuName);

    //메뉴 입력 받기 (Enter key를 눌렀을때)
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        //빈값일때 얼럿창을 띄워주누는 아래 if에서 글씨 하나 치면 얼럿창 나와서
        return;
      }
      addMenuName();
    });

    $("nav").addEventListener("click", changeCategory);
  };
}

const app = new App();
app.init();
