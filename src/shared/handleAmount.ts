export default function handleAmount(amount: number){
    const res = amount / 100
    // 保留2位小数
    return res.toFixed(2)
}