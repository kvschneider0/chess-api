import AWS from "aws-sdk";
import { queryTable } from "../../helpers/baseQueries";
import { buildResponse } from "../../helpers/buildResponse";
import { startingFen } from "../../chess/startingPosition";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const dynamoDBTableName = "Games-dev";

export async function getGameById(gameId: string) {
  const params = {
    TableName: dynamoDBTableName,
    KeyConditionExpression: "gameId = :gameId",
    ExpressionAttributeValues: {
      ":gameId": gameId,
    },
  };
  const response = await queryTable(params);
  return response;
};

export async function putGame(gameData: any) {
  const params = {
    TableName: dynamoDBTableName,
    Item: gameData,
  };
  return await dynamoDB
    .put(params)
    .promise()
    .then(() => {
      return buildResponse(201, {});
    }, (error) => {
      console.log("Error saving new game state:\n", error);
    });
};

export async function resetGame(gameId: string) {
  const params = {
    TableName: dynamoDBTableName,
    Item: {
      gameId,
      fen: startingFen,
    },
  };
  return await dynamoDB
    .put(params)
    .promise()
    .then(() => {
      return buildResponse(201, {});
    }, (error) => {
      console.log("error while resetting game:\n", error);
    });
};