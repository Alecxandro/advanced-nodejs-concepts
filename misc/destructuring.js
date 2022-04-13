//destructuring from hell
function test([x, y], [z, w]) {
  var args = [];
  const sum = () => {
    return x + y;
  };

  const mult = () => {
    return z * w;
  };
  return [[(args[0] = sum())], [(args[1] = mult())]];
}

const [a, b] = test([1, 4], [22, 4]);
console.log(a, b);
