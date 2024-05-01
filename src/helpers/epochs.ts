class Compare {
  value;
  constructor (value?) {
    this.value = value || new Date().getTime()
  }

  between (...values): boolean {
    try {
      values = values.map(value => new Date(value).getTime())
      const MIN = Math.min(...values)
      const MAX = Math.max(...values)
      return this.value >= MIN && this.value <= MAX
    } catch (error:unknown) {
      window.log("error on Compare", error as string)
      return false
    }
  }

  before (...values): boolean {
    try {
      values = values.map(value => new Date(value).getTime())
      const MAX = Math.max(...values)
      return this.value <= MAX
    } catch (error:unknown) {
      window.log("error on Compare", error as string)
      return false
    }
  }

  after (...values) {
    try {
      values = values.map(value => new Date(value).getTime())
      const MAX = Math.max(...values)
      return this.value >= MAX
    } catch (error) {
      window.log("error on Compare", error as string)
      return false
    }
  }
}

const AGORA = new Compare()

export function helperDebugTest (test:string):boolean {
  if (window.env("production") || !test) return false
  return !!(location.search && (/debug/.test(location.search) && new RegExp(String(test), "i").test(location.search)))
}

export function epochSeloPromoRa ():boolean {
  const PERIODO = AGORA.before(
    "2024-01-01T10:00:00.000-03:00",
  )

  if (helperDebugTest("epochSeloPromoRa")) return !PERIODO

  return PERIODO
}
