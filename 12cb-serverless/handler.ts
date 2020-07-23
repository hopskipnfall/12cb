import * as _ from 'lodash'
import 'source-map-support/register';
import {APIGatewayProxyHandler} from 'aws-lambda';

export const hello: APIGatewayProxyHandler =  async (event, context, callback) => {

  // dependencies work as expected
  console.log(_.VERSION)

  // async/await also works out of the box
  await new Promise((resolve, reject) => setTimeout(resolve, 500))

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v42.0! Your function executed successfully!',
      input: event,
    }),
  };

  return response;
}
