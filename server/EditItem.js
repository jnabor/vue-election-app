const AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB({region: 'ap-southeast-1', apiVersion: '2012-08-10'})

module.exports.handler = (event, context, callback) => {
  let body = JSON.parse(event.body)
  const params = {
    ExpressionAttributeNames: body.ExpressionAttributeNames,
    ExpressionAttributeValues: body.ExpressionAttributeValues,
    Key: body.Key,
    ReturnValues: body.ReturnValues,
    ReturnConsumedCapacity: body.ReturnConsumedCapacity,
    TableName: body.TableName,
    UpdateExpression: body.UpdateExpression
  }
  dynamodb.updateItem(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
      callback(null, module.response(event))
    } else {
      console.log(data)
      callback(null, module.response({"message": "Item Updated"}))
    }
  })
}

module.response = (responseBody) => {
  const response = {
    'isBase64Encoded': false,
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(responseBody)
  }
  return response
}
