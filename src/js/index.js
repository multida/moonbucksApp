const $ = (selector) => document.querySelector(selector);

//메뉴 수정하기
$("#espresso-menu-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-edit-button")) {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "메뉴 이름을 수정하시겠습니까?",
      $menuName.innerText
    );
    $menuName.innerText = editedMenuName;
  }
});

//fomr 태그가 자동으로 전송되는걸 막기
$("#espresso-menu-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

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

  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
  $(".menu-count").innerText = `총 ${menuCount}개`;
  $("#espresso-menu-name").value = "";
};

//메뉴 입력 받기 ( 확인 버튼을 눌렀을때)
$("#espresso-menu-submit-button").addEventListener("click", (e) => {
  addMenuName();
});

//메뉴 입력 받기 (Enter key를 눌렀을때)
$("#espresso-menu-name").addEventListener("keypress", (e) => {
  if (e.key !== "Enter") {
    //빈값일때 얼럿창을 띄워주누는 아래 if에서 글씨 하나 치면 얼럿창 나와서
    return;
  }
  if (e.key === "Enter") {
    addMenuName();
  }
});

/**
 * @TODO메뉴수정
 * 수정 버튼을 누르면 prompt창이 나온다.
 * 입력창에 신규 메뉴를 입력하고, 확인을 누르면 수정된다.
 */

/**
 * @TODO메뉴삭제
 * 삭제 버튼을 누르면 confirm창이 나온다.
 * 확인을 누르면 삭제된다.
 * 총 메뉴 개수 count 업데이트
 */
