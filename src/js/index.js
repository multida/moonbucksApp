/**
 * @TODO메뉴추가
 * 메뉴의 이름을 입력 받아서 확인, 엔터키를 누르면 메뉴가 추가 된다.
 * <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 <li>로  메뉴명이 생긴다. ( + 수정, 삭제 버튼)
 * 메뉴가 추가되면 입력창이 빈값으로 바뀐다.
 * 입력창에 아무것도 없으면 추가되는 작업 막기.
 * 총 메뉴 개수 count 업데이트
 */

const $ = (selector) => document.querySelector(selector);

//fomr 태그가 자동으로 전송되는걸 막기
$("#espresso-menu-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

//메뉴 입력 받기
$("#espresso-menu-name").addEventListener("keypress", (e) => {
  if (e.key !== "Enter") {
    //빈값일때 얼럿창을 띄워주누는 아래 if에서 글씨 하나 치면 얼럿창 나와서
    return;
  }
  if ($("#espresso-menu-name").value === "") {
    alert("메시지를 입력해주세요");
    return;
  }
  if (e.key === "Enter") {
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

    // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressoMenuName); -> 덮어쓰기 됨

    $("#espresso-menu-list").insertAdjacentHTML(
      //beforebegin, afterbegin, beforeend, afterend
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
    $("#espresso-menu-name").value = "";
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
