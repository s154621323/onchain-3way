// 十六进制转换
export const toHex = (str: string) => {
  return (
    '0x' +
    Array.from(unescape(encodeURIComponent(str)))
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
}

// 十六进制转回字符串
export const fromHex = (hex: string) => {
  try {
    const hexStr = hex.startsWith('0x') ? hex.substring(2) : hex
    let str = ''
    for (let i = 0; i < hexStr.length; i += 2) {
      const charCode = parseInt(hexStr.substring(i, i + 2), 16)
      str += String.fromCharCode(charCode)
    }
    return decodeURIComponent(escape(str))
  } catch (e) {
    console.error('解析十六进制失败:', e)
    return '无法解析数据'
  }
}