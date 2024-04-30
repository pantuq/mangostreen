export const time = (date = new Date()) => {
    const api = {
        Formt: (pattern: string) => {
            // 对时间进行格式化
            // YYYY-MM-DD hh:mm:ss.ms
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            const msecond = date.getMilliseconds()

            return pattern.replace(/YYYY/g, year.toString())
            .replace(/MM/g, month.toString().padStart(2, '0'))
            .replace(/DD/g, day.toString().padStart(2, '0'))
            .replace(/hh/g, hour.toString().padStart(2, '0'))
            .replace(/mm/g, minute.toString().padStart(2, '0'))
            .replace(/ss/g, second.toString().padStart(2, '0'))
            .replace(/ms/g, msecond.toString().padStart(3, '0'))
        },
        FormData: () => {
            const daylist = []
            daylist.push(date.getFullYear())
            daylist.push(date.getMonth() + 1)
            daylist.push(date.getDate())
            return daylist
        }
    }

    return api
}
