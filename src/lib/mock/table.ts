export default [
  {
    url: '/table',
    type: 'get',
    response: {
      data: {
        column_options: [
          {
            headerName: 'id',
            type: 'string',
            width: 60,
            editable: false,
            align: 'center',
            headerAlign: 'center',
          },
          {
            headerName: 'title',
            type: 'string',
            width: 100,
            editable: true,
            align: 'center',
            headerAlign: 'center',
          },
          {
            headerName: 'content',
            type: 'string',
            width: 600,
            editable: true,
            align: 'left',
            headerAlign: 'center',
          },
        ],
        table: [
          ['1', 'title1', 'this is content1'],
          [
            '2',
            'title2',
            'this is content2222222222222222222222222222222222222222',
          ],
          ['3', 'title3', 'this is content3'],
          ['4', 'title4', 'this is content4'],
          ['5', 'title5', 'this is content5'],
          ['6', 'title6', 'this is content6'],
          ['7', 'title7', 'this is content7'],
          ['8', 'title8', 'this is content8'],
          ['9', 'title9', 'this is content9'],
          ['10', 'title10', 'this is content10'],
          ['11', 'title11', 'this is content11'],
          ['12', 'title12', 'this is content12'],
          ['13', 'title13', 'this is content13'],
        ],
      },
    },
  },
  {
    url: '/table',
    type: 'post',
    response: {},
  },
]
