const AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB({region: 'ap-southeast-1', apiVersion: '2012-08-10'})

module.exports.handler = (event, context, callback) => {
  let body = JSON.parse(event.body)
  let requests = []
  for (var key in body.Items) {
    let request = {
      PutRequest: {
        Item: body.Items[key]
      }
    }
    requests.push(request)
  }
  const params = {
    RequestItems: {
      [body.TableName]: requests
    },
    ReturnConsumedCapacity: body.ReturnConsumedCapacity
  }
  console.log('params: ' + JSON.stringify(params))
  dynamodb.batchWriteItem(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
      callback(null, module.response(event))
    } else {
      console.log(data)
      callback(null, module.response({'message': 'Items Added'}))
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

/*
{
  "body": {
    "Items": [
      {
        "electionId": {
          "S": "gdgoih1234567890"
        },
        "positionName": {
          "S": "President"
        },
        "voteCount": {
          "N": "0"
        }
      },
      {
        "electionId": {
          "S": "gdgoih1234567890"
        },
        "positionName": {
          "S": "Vice-President"
        },
        "voteCount": {
          "N": "0"
        }
      },
      {
        "electionId": {
          "S": "gdgoih1234567890"
        },
        "positionName": {
          "S": "Secretary"
        },
        "voteCount": {
          "N": "0"
        }
      }
    ],
    "ReturnConsumedCapacity": "TOTAL",
    "TableName": "vue-election-app-dev-candidates-tbl"
  }
}
*/
