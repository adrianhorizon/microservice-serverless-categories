'use strict';

const dynamoDb = require('../config/dynamodb');
let response = {};

const create = async (event) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.id !== 'string') {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Couldn\'t create the categorie item.'
      })
    }
    return response;
  }

  let params = {};
  params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: data.id,
      sublevels: [],
      createAt: timestamp,
    }
  };

  data.sublevels.map((item) => {
    params.Item.sublevels.push({
      idSublevel: item.idSublevel,
      name: item.name,
      price: item.price
    });
  });

  const createCategories = await dynamoDb.put(params).promise()
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify(createCategories)
    };
    return response;
  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t remove the todo item.'
    };
    return response;
  }
};


const deleteCategories = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params).promise()
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Delete success'
      })
    };
    return response;
  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t remove the todo item.'
    };
    return response;
  }
};

const get = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  const userGet = await dynamoDb.get(params).promise()
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify(userGet)
    };
    return response;
  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t remove the todo item.'
    };
    return response;
  }
};

const list = async () => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  const listUser = await dynamoDb.scan(params).promise()
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify(listUser.Items)
    };
    return response;
  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t remove the todo item.'
    };
    return response;
  }
};

  // const update = async (event) => {
  //   const timestamp = new Date().getTime();
  //   const data = JSON.parse(event.body);

  //   if (typeof data.nameService !== 'string') {
  //     response = {
  //       statusCode: 400,
  //       body: JSON.stringify({ message: 'Couldn\'t create the todo item.' })
  //     }
  //     return response;
  //   }

  //   const params = {
  //     TableName: process.env.DYNAMODB_TABLE,
  //     Key: {
  //       id: event.pathParameters.id,
  //     },
  //     ExpressionAttributeNames: {
  //       '#service_put': 'id',
  //     },
  //     ExpressionAttributeValues: {
  //       ':id': data.id,
  //       ':createAt': timestamp,
  //     },
  //     UpdateExpression: 'SET #service_put = :nameService, price = :price, quantity = :quantity, available = :available, sublevelId = :sublevelId, createAt = :createAt',
  //     ReturnValues: 'ALL_NEW',
  //   };

  //   const updateUser = dynamoDb.update(params).promise()
  //   try {
  //     response = {
  //       statusCode: 201,
  //       body:JSON.stringify(updateUser)
  //     };
  //     return response;
  //   } catch (error) {
  //     response = {
  //       statusCode: error.statusCode || 501,
  //       headers: { 'Content-Type': 'text/plain' },
  //       body: 'Couldn\'t remove the todo item.'
  //     };
  //     return response;
  //   }
  // };

module.exports.create = create;
module.exports.deleteCategories = deleteCategories;
module.exports.get = get;
module.exports.list = list;
// module.exports.update = update;