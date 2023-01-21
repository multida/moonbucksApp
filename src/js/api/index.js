const BASE_URL = "http://localhost:3000/api";
//fetch(`${BASE_URL}`, option);
const MenuApi = {
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
  },
  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST", //생성
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.log("에러가 발생했습니다.");
    }
  },
  async updateMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "PUT", //수정
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.log("에러가 발생했습니다.");
    }
    return response.json();
  },
  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldOut`,
      {
        method: "PUT", //수정
      }
    );
    if (!response.ok) {
      console.log("에러가 발생했습니다.");
    }
  },
  async deleteMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log("에러가 발생했습니다.");
    }
  },
};

export default MenuApi;
