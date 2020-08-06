/* 
Given 2 sorted arrays A and B with n and m elements respectively. A has enough space
at the end of the array to fit in all elements of B. Write an algorithm to merge the
elements of A and B ensuring the resultant A is sorted as well. The code cannot use an
extra array.
Input: A = 1 3 5 6 8 - - -
B = 0 2 10
Output: A = 0 1 2 3 5 6 8 10 */

let a = [];
a.length = 7;
a[0] = 1;
a[1] = 3;
a[2] = 5;
a[3] = 6;

let b = [1, 8, 10];

let n = a.length - b.length,
  m = b.length;
let isSortRequired = a[n - 1] > b[0] ? true : false;
let i = n;
let j = 0;
while (i < m + n) {
  a[i] = b[j];
  i++;
  j++;
}

if (isSortRequired) {
  a.sort((a, b) => a - b);
}

console.log("--", a);
