import api from "./api";

const API_URL = "http://localhost:5000/api/menu";

export const getMenus = async () => {
  const res = await api.get("/menu");
  return res.data;
};

export const addMenu = async (menuData) => {
  const form = new FormData();
  form.append("name", menuData.name);
  form.append("price", menuData.price);
  form.append("category", menuData.category);
  form.append("available", menuData.available);
  if (menuData.photo instanceof File) {
    form.append("photo", menuData.photo);
  }

  const res = await api.post("/menu", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateMenu = async (id, menuData) => {
  const form = new FormData();
  form.append("name", menuData.name);
  form.append("price", menuData.price);
  form.append("category", menuData.category);
  form.append("available", menuData.available);
  if (menuData.photo instanceof File) {
    form.append("photo", menuData.photo);
  }

  const res = await api.put(`/menu/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMenu = async (id) => {
  const res = await api.delete(`/menu/${id}`);
  return res.data;
};

export const updateAvailability = async (menuId, available) => {
  const res = await api.patch(`/menu/${menuId}/availability`, { available });
  return res.data;
};
