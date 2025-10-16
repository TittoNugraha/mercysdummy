import api from "./api";

export const getOrders = async () => {
  const res = await api.get("http://localhost:5000/api/orders");
  return res.data;
};

export const getOrderById = async (orderId) => {
  const res = await api.get(`http://localhost:5000/api/orders/${orderId}`);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("http://localhost:5000/api/orders", orderData);
  return res.data;
};

export const updateOrderStatus = async (order_id, status) => {
  const res = await api.patch(
    `http://localhost:5000/api/orders/${order_id}/status`,
    {
      status,
    }
  );
  return res.data;
};
