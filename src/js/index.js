const $ = (selector) => document.querySelector(selector);

const updateMenuCount = () => {
  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
  $(".menu-count").innerText = `총 ${menuCount}개`;
  $("#espresso-menu-name").value = "";
};

const addMenuName = () => {
  if ($("#espresso-menu-name").value === "") {
    alert("메시지를 입력해주세요");
    return;
  }

  const espressoMenuName = $("#espresso-menu-name").value;
  const menuItemTemplate = (menuItemTemplate) => {
    return `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
  };

  $("#espresso-menu-list").insertAdjacentHTML(
    "beforeend",
    menuItemTemplate(espressoMenuName)
  );

  updateMenuCount();
};

const updateMenuName = (e) => {
  const $menuName = e.target.closest("li").querySelector(".menu-name");
  const editedMenuName = prompt(
    "메뉴 이름을 수정하시겠습니까?",
    $menuName.innerText
  );
  if (editedMenuName === null || editedMenuName === undefined) {
    console.log($menuName.value);
  }
  $menuName.innerText = editedMenuName;
};

const removeMenuName = (e) => {
  if (confirm("정말 삭제하시겠습니까?")) {
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
