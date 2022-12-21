export default function splitArrayToPairs(arr) {
  if (!arr.length) return [];
  return arr.reduce(function (result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
}
