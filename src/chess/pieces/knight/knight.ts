import { indexToFileRank, fileRankToIndex } from "../../helpers/gen/genHelpers";
import {
  isFileRankOnBoard,
  moveTargetingFriendly,
} from "../helpers/helpers";

function knightCanMove(
  fen: string,
  fromIndex: number,
  toIndex: number,
): boolean {

  if (moveTargetingFriendly(fen, fromIndex, toIndex)) return false;

  if (getVisibility(fromIndex).includes(toIndex)) return true;

  return false;
}

const offsets = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

export const getVisibility = (index: number): number[] => {
  const [file, rank] = indexToFileRank(index);

  const moves = [];
  for (const [offsetFile, offsetRank] of offsets) {
    const newFile = file + offsetFile;
    const newRank = rank + offsetRank;
    if (isFileRankOnBoard(newFile, newRank)) {
      const newIndex = fileRankToIndex(newFile, newRank);
      moves.push(newIndex);
    }
  }

  return moves;
}

export default knightCanMove;
