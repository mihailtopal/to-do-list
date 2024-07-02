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
// const nums = [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
// function findMaxConsecutiveOnes(nums) {
//   let total = 0;
//   let bufer = 0;
//   nums.forEach((el) => {
//     if (el === 1) {
//       total += el;
//       if (total > bufer) bufer = total;
//     } else total = 0;
//   });
//   return bufer;
// }
// console.log(findMaxConsecutiveOnes(nums));
// const getDecisions1 = [
//   { id: 1, result: "approved" },
//   { id: 3, result: "waiting" },
//   { id: 15, result: "approved" },
//   { id: 20, result: "approved" },
//   { id: 26, result: "waiting" },
//   { id: 30, result: "approved" },
// ];

// const getDecisions2 = [
//   { id: 2, result: "approved" },
//   { id: 4, result: "waiting" },
//   { id: 14, result: "approved" },
//   { id: 16, result: "approved" },
//   { id: 23, result: "waiting" },
//   { id: 32, result: "approved" },
// ];

// const getLastDecisions = (decisions1, decisions2, k) => {
//   let result = [];
//   let i1 = decisions1.length - 1;
//   let i2 = decisions2.length - 1;
//   while (result.length < k && (decisions1[i1] || decisions2[i2])) {
//     if (decisions1[i1] && !decisions2[i2]) {
//       result.push(decisions1[i1]);
//       i1--;
//     } else if (!decisions1[i1] && decisions2[i2]) {
//       result.push(decisions2[i2]);
//       i2--;
//     } else if (decisions1[i1].id > decisions2[i2].id) {
//       result.push(decisions1[i1]);
//       i1--;
//     } else {
//       result.push(decisions2[i2]);
//       i2--;
//     }
//   }
//   return result;
// };
// console.log(getLastDecisions(getDecisions1, getDecisions2, 2));
// const array = [1, 3, 4, 6, 6, 7, 10];   // такое себе решение
// const hasPairWithSum = (arr, num) => {
//   let currentindex = 1;
//   for (let index = 0; index < arr.length; index++) {
//     if (arr[index] > num) return false;
//     while (currentindex < arr.length) {
//       if (arr[index] + arr[currentindex] < num) currentindex++;
//       else if (arr[index] + arr[currentindex] === num) return true;
//       else break;
//     }
//     currentindex = index + 2;
//   }
//   return false;
// };
// console.log(hasPairWithSum(array, 12));   // Норм решение
// const array = [1, 3, 4, 6, 6, 7, 10];

// const hasPairWithSum = (arr, num) => {
//   const mapObj = new Map();
//   for (let index = 0; index < arr.length; index++) {
//     mapObj.set(num - arr[index], arr[index]);
//     if (mapObj.has(arr[index])) return true;
//   }
//   return false;
// };
// console.log(hasPairWithSum(array, 7));

// const array = [1, 3, 4, 6, 6, 7, 10]; // отличное решение

// const hasPairWithSum = (arr, num) => {
//   let i1 = 0;
//   let i2 = arr.length - 1;
//   while (i1 < i2) {
//     if (arr[i1] + arr[i2] > num) i2--;
//     else if (arr[i1] + arr[i2] < num) i1++;
//     else {
//       return true;
//     }
//   }
//   return false;
// };
// console.log(hasPairWithSum(array, 12));
const array = [4, 12, 7, 33, 18, 11, 16, 13, 9];

const Tree = (array) => {
  const root = (value) => {
    return { value: value, left: null, right: null };
  };
  const ResultTree = root(array.shift());

  const func = (branch, el) => {
    if (el > branch.value) {
      if (branch.right) func(branch.right, el);
      else {
        branch.right = root(el);
        return;
      }
    } else {
      if (branch.left) func(branch.left, el);
      else {
        branch.left = root(el);
        return;
      }
    }
  };

  array.map((el) => func(ResultTree, el));

  return ResultTree;
};
console.log(Tree(array));
