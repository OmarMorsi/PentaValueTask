export const getOrdersInLastHour = (
  orders: {total: number; timestamp: number}[],
) => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000; // One hour ago
  return orders.filter(order => order.timestamp > oneHourAgo);
};
