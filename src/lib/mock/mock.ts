import Mock from 'mockjs'

import login from './login'
import table from './table'

const mocks = [...login, ...table]

for (const item of mocks) {
  Mock.mock(item.url, item.type, item.response)
}
