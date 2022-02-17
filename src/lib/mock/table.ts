export default [
  {
    url: '/table',
    type: 'get',
    response: {
      data: {
        columns_option: [{
            header_name: 'id',
            type: 'string',
            width: 200,
            editable: false,
          },{
            header_name: 'title',
            type: 'string',
            width: 200,
            editable: true,
          },{
            header_name: 'content',
            type: 'string',
            width: 400,
            editable: true,
          }
        ],
        table: [
          ['1', 'title1', 'this is content1'],
          ['2', 'title2', 'this is content2'],
          ['3', 'title3', 'this is content3'],
        ]
      }
    }
  },{
    url: '/table',
    type: 'post',
    response: {}
  },
];