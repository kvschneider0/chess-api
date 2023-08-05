import {
  isNumeric,
  indexToFileRank,
  fileRankToIndex,
} from "./genHelpers";

test("test isNumeric", () => {
  expect(isNumeric("wowwhatacoolsentencewehavehere")).toBe(false);
  expect(isNumeric("#%@*&*^*%(&#$%")).toBe(false);
  expect(isNumeric("57357345")).toBe(true);
  expect(isNumeric("3")).toBe(true);
  expect(isNumeric("butfjkh5fgsdtbsd")).toBe(false);
  expect(isNumeric("3521875962$352315")).toBe(false);
});

test("test indexToFileRank", () => {
  expect(indexToFileRank(0)).toEqual([1, 8]);
  expect(indexToFileRank(7)).toEqual([8, 8]);
  expect(indexToFileRank(56)).toEqual([1, 1]);
  expect(indexToFileRank(63)).toEqual([8, 1]);
});

test("test fileRanktToInex", () => {
  expect(fileRankToIndex(1, 8)).toEqual(0);
  expect(fileRankToIndex(8, 8)).toEqual(7);
  expect(fileRankToIndex(1, 1)).toEqual(56);
  expect(fileRankToIndex(8, 1)).toEqual(63);
});