export function dataLayer (data: Record<string, string>|undefined):void {
  if (data) {
    Object.keys(data).forEach(dataLayerKeys => {
      data[dataLayerKeys] = String(data[dataLayerKeys]).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-").replace(/(,|\?|!)/g, "")
      for (let dataLayerString = 0; dataLayerString < data[dataLayerKeys].length; dataLayerString++) {
        if (/\./.test(data[dataLayerKeys].charAt(dataLayerString))) {
          if (/\W/.test(data[dataLayerKeys].charAt(dataLayerString - 1))) {
            data[dataLayerKeys] = `${data[dataLayerKeys].substring(0, dataLayerString)}${data[dataLayerKeys].substring(dataLayerString + 1)}`
          }
          if (/\W/.test(data[dataLayerKeys].charAt(dataLayerString + 1))) {
            data[dataLayerKeys] = `${data[dataLayerKeys].substring(0, dataLayerString)}${data[dataLayerKeys].substring(dataLayerString + 1)}`
          }
        }
      }
    })
    window.dataLayer.push(data)
  }
}