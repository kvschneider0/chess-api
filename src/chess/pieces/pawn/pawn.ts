import { parseFen, fenToPieceArray } from "../../helpers/fen/fenHelpers";
import { fileRankToIndex, indexToFileRank } from "../../helpers/gen/genHelpers";
import { getPieceColor, moveTargetingFriendly } from "../helpers/helpers";

function pawnCanMove(
  fen: string,
  fromIndex: number,
  toIndex: number,
): boolean {

  if (moveTargetingFriendly(fen, fromIndex, toIndex)) return false;

  if (getMoves(fen, fromIndex).includes(toIndex)) return true;

  return false;
}

export const getMoves = (fen: string, index: number): number[] => {
  const parsedFEN = parseFen(fen);
  const pieceArray = fenToPieceArray(fen);
  const [file, rank] = indexToFileRank(index);
  const piece = pieceArray[index];
  if (piece?.toLowerCase() !== "p") return [];
  const pieceColor = getPieceColor(piece);
  const sign = pieceColor === "w" ? 1 : -1;

  let targetFile: number;
  let targetRank: number;
  let targetIndex: number;
  let targetPiece: string | null;
  let middlePiece: string | null;

  const moves = [];
  // 1 rank
  targetFile = file;
  targetRank = rank + (sign * 1);
  targetIndex = fileRankToIndex(targetFile, targetRank);
  targetPiece = pieceArray[targetIndex];
  if (targetPiece === null) moves.push(targetIndex);

  // 2 ranks
  if (rank === 2 || rank === 7) {
    targetFile = file;
    targetRank = rank + (sign * 2);
    targetIndex = fileRankToIndex(targetFile, targetRank);
    targetPiece = pieceArray[targetIndex];
    middlePiece = pieceArray[targetIndex - 8];
    if (targetPiece === null && middlePiece == null) moves.push(targetIndex);
  }

  // capture
  for (const offset of [1, -1]) {
    const targetFile = file + offset;
    const targetRank = rank + (sign * 1);
    if (targetFile > 0 && targetFile < 9) {
      const targetIndex = fileRankToIndex(targetFile, targetRank);
      const targetPiece = pieceArray[targetIndex];
      if (targetPiece === null) continue;
      moves.push(targetIndex);
    }
  }

  // en passant
  // const { enPassantTarget } = parsedFEN;
  // if (enPassantTarget !== null) {
  //   const enPassantTargetIndex
  // }


  return moves;
};