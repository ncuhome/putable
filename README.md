# putable

简介：

一个toD的开源项目

主体项目由纯前端实现，通过约定的抽象接口，与业务解耦，建设一套通用的后台页面，提供表格视图帮助开发者连通后端数据和运营人员，是涉及查看和修改简单数据的各种后台的代替者

网站：

https://jiutian-moon-team.github.io/jtdocs/

产品文档：

https://www.yuque.com/docs/share/223970bc-f7ab-45d9-a62d-e0cc5eeea343

产品原型图：

https://www.figma.com/file/0PiPc5D3lImcgRWExfFpt5/jtdocs?node-id=0%3A1

## 技术栈说明

使用 create-react-app 初始化的 typescript 项目，

## 工程文件结构说明

/src/components   各类组件

/src/pages   各页面

/src/lib/api   Api相关方法、配置

/src/lib/interface   类型及接口定义

/src/lib/storage   本地存储相关方法、配置

/src/lib/mock   mock相关数据

/src/App.tsx   入口文件

/docs   github pages部署页面

## 接口约定文档

后端开发者可按本文档实现一套接口，而本项目jtdocs可作为使用该接口的前端，进行数据操作

host: 自定义

port：自定义

### 使用前须知

除登录外，所有接口都应当带上Authorization请求头，值为登录接口返回的token（json web token）。

登录的账户应当是专门的管理数据账户，而非产品用户等普通用户。

http状态码为 2xx 时，将被认为请求成功，否则认为发送错误

对于所有错误响应，都应当返回响应体：

| 字段 | 类型 | 说明 |
| ---  | ---  | ---  |
|  message  |  string  |  错误描述，将展示给用户 |

```js
{
    "message":"请求参数错误",
}
```

### 方法描述：用户登录

URL地址：自定义

请求方法：POST

请求体：

| 字段 | 类型 | 说明 |
| ---  | ---  | ---  |
|  account  |  string  |  用户名 |
|  password  |  string  |  密码  |

请求体示例

```js
{
    "account":"pyf",
    "password":"12345678"
}
```

响应体：

| 字段 | 类型 | 说明 |
| ---  | ---  | ---  |
|  data  |  object  |  数据  |

响应体示例

```js
{
    "data": {
        "token": "xxx.xxx.xxx"
    }
}
```

### 方法描述：获取数据

URL地址：自定义

请求方法：GET

请求体：无

响应体：

| 字段 | 类型 | 说明 |
| ---  | ---  | ---  |
|  data  |    |  具体看示例  |

响应体示例

```js
{
    "data": {
        "columns_option": [{  //列参数，该参数可选，且各属性也都是可选的
                "headerName": 'id',  //表头
                "type": 'string',  //数据类型，暂时只支持string
                "width": 100,  //在表格中列的显示宽度
                "editable": false,  //是否可编辑
                "align": "center",  // 列对齐方式，left, right, center
                "headerAlign": "center"  //标题对齐方式，left, right, center
            },{
                "headerName": "title",
                "type": "string",
                "width": 200,
                "editable": true,
                "align": "center",
                "headerAlign": "center"
            },{
                "headerName": "content",
                "type": "string",
                "width": 400,
                "editable": true,
                "align": "center",
                "headerAlign": "center"
            }
        ],
        "table": [  //具体表格数据
            ['1', 'title1', 'this is content1'],
            ['2', 'title2', 'this is content2'],
            ['3', 'title3', 'this is content3']
        ]
    }
}
```

### 方法描述：推送数据

URL地址：自定义

请求方法：POST

请求体：无

| 字段 | 类型 | 说明 |
| ---  | ---  | ---  |
|  table  |    |  具体看示例  |

请求体示例

```js
{
    "table": [  //具体表格数据
        ['1', 'title1', 'this is content1'],
        ['2', 'title2', 'this is content2'],
        ['3', 'title3', 'this is content3']
    ]
}
```

响应体:无
