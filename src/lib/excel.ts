import { Workbook } from 'exceljs'
import fileDownload from 'js-file-download'

export const rowsToExcel = async (rows: string[][]) => {
  const wb = new Workbook()
  const sh = wb.addWorksheet('Sheet1')
  sh.addRows(rows)
  const b = await wb.xlsx.writeBuffer()
  // const dec = new TextDecoder('utf-8')
  // console.log(dec.decode(b))
  fileDownload(b, new Date().toLocaleString() + '.xlsx')
}
export const parseExcel = async (file: File): Promise<string[][]> => {
  const wb = new Workbook()
  const b = await file.arrayBuffer()

  await wb.xlsx.load(b)
  const r: string[][] = []
  wb.worksheets[0].eachRow((row) => {
    if (Array.isArray(row.values)) {
      r.push(row.values.slice(1).map((v) => v?.toString() || ''))
    } else {
      r.push(Object.values(row.values).map((v) => v?.toString() || ''))
    }
  })
  return r
}
