/**
 * 时间处理
 * example
 * import { time } from 'shared/Time'
 * const time = new time()
 * time.Formt('YYYY-MM-DD hh:mm:ss.ms')
 * time.firstDayOfMonth()
 * time.lastDayOfMonth()
 * time.firstDayOfYear()
 * time.lastDayOfYear()
 * time.FormData()
 * time.add(1,'month')
 * time.subtract(1,'month')
 */
export class Time {
  date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  Formt(pattern = "YYYY-MM-DD") {
    // 对时间进行格式化
    // YYYY-MM-DD hh:mm:ss.ms
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    const second = this.date.getSeconds();
    const msecond = this.date.getMilliseconds();

    return pattern
      .replace(/YYYY/g, year.toString())
      .replace(/MM/g, month.toString().padStart(2, "0"))
      .replace(/DD/g, day.toString().padStart(2, "0"))
      .replace(/hh/g, hour.toString().padStart(2, "0"))
      .replace(/mm/g, minute.toString().padStart(2, "0"))
      .replace(/ss/g, second.toString().padStart(2, "0"))
      .replace(/ms/g, msecond.toString().padStart(3, "0"));
  }
  FormData() {
    const daylist = [];
    daylist.push(this.date.getFullYear());
    daylist.push(this.date.getMonth() + 1);
    daylist.push(this.date.getDate());
    return daylist;
  }
  firstDayOfMonth() {
    // 获取当前月份第一天
    const firstDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1,
      0,
      0,
      0
    );
    return new Time(firstDay);
  }
  lastDayOfMonth() {
    // 获取当前月份最后一天
    const lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0,
      0,
      0,
      0
    );
    return new Time(lastDay);
  }
  firstDayOfYear() {
    // 获取当前年份第一天
    const firstDay = new Date(this.date.getFullYear(), 0, 1, 0, 0, 0);
    return new Time(firstDay);
  }
  lastDayOfYear() {
    // 获取当前年份最后一天
    const lastDay = new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0);
    return new Time(lastDay);
  }
  getRaw() {
    return this.date;
  }
  add(
    amount: number,
    unit:
      | "year"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond"
  ) {
    // return new Time but not change this.date
    const date = new Date(this.date.getTime());
    switch (unit) {
      case "year":
        date.setFullYear(date.getFullYear() + amount);
        break;
      case "month":
        const d = date.getDate();
        date.setDate(1);
        date.setMonth(date.getMonth() + amount);
        const d2 = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0,
          0,
          0,
          0
        ).getDate();
        date.setDate(Math.min(d, d2));
        break;
      case "day":
        date.setDate(date.getDate() + amount);
        break;
      case "hour":
        date.setHours(date.getHours() + amount);
        break;
      case "minute":
        date.setMinutes(date.getMinutes() + amount);
        break;
      case "second":
        date.setSeconds(date.getSeconds() + amount);
        break;
      case "millisecond":
        date.setMilliseconds(date.getMilliseconds() + amount);
        break;
      default:
        throw new Error("unit is not valid");
    }
    return new Time(date);
  }
}

export function transformString(str: string){
  const date = new Date(str);
  const strlist = []
  strlist.push(date.getFullYear())
  strlist.push(date.getMonth()+1)
  strlist.push(date.getDate())
  return strlist.join('-')
}
