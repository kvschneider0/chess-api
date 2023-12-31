import { fileRankToIndex, indexToFileRank } from "../../helpers/gen/genHelpers";
import { fenToPieceArray } from "../../helpers/fen/fenHelpers";
import {
  isFileRankOnBoard,
  moveTargetingFriendly,
} from "../helpers/helpers";

function rookCanMove(
  fen: string,
  fromIndex: number,
  toIndex: number,
): boolean {

  if (moveTargetingFriendly(fen, fromIndex, toIndex)) return false;

  if (getVisibility(fen, fromIndex).includes(toIndex)) return true;

  return false;
}

const offsets = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const getVisibility = (fen: string, index: number): number[] => {
  const pieceArray = fenToPieceArray(fen);
  const [file, rank] = indexToFileRank(index);

  const moves = [];
  for (const [offsetFile, offsetRank] of offsets) {
    let [targetFile, targetRank] = [file, rank];
    while (true) {
      targetFile += offsetFile;
      targetRank += offsetRank;

      if (!isFileRankOnBoard(targetFile, targetRank)) break;

      const targetIndex = fileRankToIndex(targetFile, targetRank);
      moves.push(targetIndex);

      const targetPiece = pieceArray[targetIndex];
      if (targetPiece !== null) break;
    }
  }

  return moves;
};

export default rookCanMove;