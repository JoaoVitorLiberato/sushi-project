function isJson (str:string|undefined):boolean {
  // https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
  if (!str) return false

  try {
    JSON.parse(str)
  } catch (error:unknown) {
    return false
  }

  return true
}

export function viaCepFields (input?: string): string|Record<string, string> {
  const VIACEP_FIELDS = sessionStorage.getItem("viacep")
  let viaCepObject = {}
  if (VIACEP_FIELDS && isJson(VIACEP_FIELDS)) {
    viaCepObject = JSON.parse(VIACEP_FIELDS)
  }
  if (input) {
    return viaCepObject[input]
  }
  return viaCepObject
}
