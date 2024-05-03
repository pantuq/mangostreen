interface FData {
    [key: string]: string | number | null | undefined | FData;
}
type Rule<T> = {
    key: keyof T;
    message: string;
} & (
    {type: 'required'} |
    {type: 'pattern', regex: RegExp}
)
type Rules<T> = Rule<T>[]
export type {FData,Rule,Rules}
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [key in keyof T]?: string[];
  }
  const errors: Errors = {};

  rules.map(rule => {
    const {key,type,message} = rule
    const value = formData[key];
    switch (type) {
      case 'required':
        if (value === null || value === undefined || value === '') {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message);
        }
        break;
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
            errors[key] = errors[key] ?? []
            errors[key]?.push(message);
        }
        break;
      default:
        return
    }
  })
  return errors;
};