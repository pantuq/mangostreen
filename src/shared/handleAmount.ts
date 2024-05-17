//   总金额处理: 将金额转为元,保留两位小数
export default function handleAmount(amount: number) {
  const res = amount / 100;
  // 保留2位小数
  return res.toFixed(2);
}
