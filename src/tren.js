// const arr = [1, 2, 5, 10, 9, 11, 6, 8, 0, 13];
// const getRanges = (arr) => {
//   let sortArr = arr.sort((a, b) => a - b);
//   let string = "";
//   sortArr.forEach((item, index, array) => {
//     if (index === 0) string += item;
//     if (array[index + 1] && array[index + 1] - array[index] !== 1) {
//       string += `-${item}, ${array[index + 1]}`;
//     }
//   });

//   return string || "void";
// };
// let result = getRanges(arr);
// console.log(result);

// const name = "bill Gates foil";
// const toInitials = (fullName) => {
//   return (
//     fullName
//       .split(" ")
//       .map((el) => el.charAt(0).toUpperCase())
//       .join(".") + "."
//   );
// };
// console.log(toInitials(name));
// const number = -12;
// const sumDigits = (number) => {
//   return Math.abs(number)
//     .toString()
//     .split("")
//     .reduce((sum, el) => +sum + +el, 0);
// };
// console.log(sumDigits(number));
// const array = [1, 3, 1, -1, 23, 14];
// const minMax = (arr) => {
//   let sortArr = arr.sort((a, b) => a - b);

//   return [sortArr[0], sortArr[sortArr.length - 1]];
// };
// console.log(minMax(array));
// const string = "abcd";
// const accum = (string) => {
//   return string
//     .toUpperCase()
//     .split("")
//     .map((el, index) => {
//       return (el += el.repeat(index).toLowerCase());
//     })
//     .join("-");
// };
// console.log(accum(string));
const nums = [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
function findMaxConsecutiveOnes(nums) {
  let total = 0;
  let bufer = 0;
  nums.forEach((el) => {
    if (el === 1) {
      total += el;
      if (total > bufer) bufer = total;
    } else total = 0;
  });
  return bufer;
}
console.log(findMaxConsecutiveOnes(nums));
