import { CellRichTextValue, CellValue, Workbook } from 'exceljs'
import fileDownload from 'js-file-download'

export const rowsToExcel = async (rows: string[][]) => {
  const wb = new Workbook()
  const sh = wb.addWorksheet('Sheet1')
  sh.addRows(rows)
  const b = await wb.xlsx.writeBuffer()
  fileDownload(b, new Date().toLocaleString() + '.xlsx')
}

const valueToString = (value: CellValue): string => {
  if (!value) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString()
  }
  if (value instanceof Date) {
    return value.toLocaleString()
  }
  if (typeof value === 'object') {
    if ('error' in value) {
      return value.error
    }
    if ('richText' in value) {
      return value.richText.map((v) => v.text).join('')
    }
    if ('hyperlink' in value) {
      // `value.hyperlink.text` can actually be string or CellRichTextValue
      return `${valueToString(value.text as string | CellRichTextValue)} ${
        value.hyperlink
      }`
    }
  }
  return ''
}

export const parseExcel = async (file: File): Promise<string[][]> => {
  const wb = new Workbook()
  const b = await file.arrayBuffer()

  await wb.xlsx.load(b)
  const r: string[][] = []
  wb.worksheets[0].eachRow((row) => {
    if (Array.isArray(row.values)) {
      // Skip the first empty value in `row.values`
      r.push(row.values.slice(1).map(valueToString))
    } else {
      r.push(Object.values(row.values).map(valueToString))
    }
  })
  return r
}
