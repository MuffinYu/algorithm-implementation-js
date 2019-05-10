const operation_priority = ["(", "[", "{", "+-", "*/", "}", "]", ")"];

const operation_compare = (a, b) => {
  var aIndex = -1, bIndex = -1, i = 0;
  while ((aIndex === -1 || bIndex === -1) && i < operation_priority.length) {
    var item = operation_priority[i];
    if (item.indexOf(a) > -1) {
      aIndex = i;
    }
    if (item.indexOf(b) > -1) {
      bIndex = i;
    }
    i++;
  }
  return aIndex - bIndex > -1;
};

// num1 <ope> num2
function compute(ope_stack, num_stack, item) {
  var res = 0;
  // console.log("compute", ope_stack, num_stack, item);
  // return [ope_stack, num_stack];
  // console.log('compute', num2, ope, num1);
  var continued = true;
  while (continued) {
    var ope = ope_stack.pop(),
      num1 = Number(num_stack.pop()),
      num2 = Number(num_stack.pop());
    switch (ope) {
      case "+":
        res = num2 + num1;
        break;
      case "-":
        res = num2 - num1;
        break;
      case "*":
        res = num2 * num1;
        break;
      case "/":
        res = num2 / num1;
        break;
    }
    num_stack.push(res);
    // console.log("continued", continued, ope_stack, num_stack);
    if (ope_stack.length > 0) {
      // 有运算符
      ope = ope_stack[ope_stack.length - 1];
      if (")]}".indexOf(item) > -1) { // 右括号 运算到左括号为止
        if ('([{'.indexOf(ope) > -1) {
          continued = false;
        }
      } else if (!operation_compare(ope, item)) {
        continued = false;
      }
    } else {
      // 无运算符号
      continued = false;
    }
    // console.log("continued2", continued, ope_stack, num_stack);

  }
  // console.log("continued3", continued, ope_stack, num_stack);
  return [ope_stack, num_stack];
}

module.exports = (str) => {
// const main = (str) => {
  var num_stack = [], ope_stack = [];

  strArr = str.replace(/\s+/g, '').split('');
  var len = strArr.length;
  for (let i = 0; i < len; i++) {
    var item = strArr[i];
    // console.log("item =>",item, num_stack, ope_stack);
    
    if (isNaN(Number(item))) { // 运算符
      if (ope_stack.length === 0 || item === '(' || item === '[' || item === "{") {
        // 运算符号栈空 || 左括号 => 入栈
        ope_stack.push(item);
      } else if (operation_compare(ope_stack[ope_stack.length - 1], item) || ')]}'.indexOf(item) > -1) {
        // 栈顶运算符优先级 >= 当前运算符 || 右括号 => 直接运算 
        [ope_stack, num_stack] = compute(ope_stack, num_stack, item);
        if (")]}".indexOf(item) === -1) { // 不是右括号，运算完成后，运算符入栈
          ope_stack.push(item);
        } else { // 是右括号，运算完的左括号也出栈
          ope_stack.pop();
        }
      } else {
        ope_stack.push(item);
      }
    } else { // 数字
      if (strArr[i - 1] && !isNaN(Number(strArr[i - 1]))) { // 上个也是数字
        item = Number(item) + num_stack[num_stack.length - 1] * 10; // 多位数
        num_stack[
          num_stack.length - 1 > 0 ? num_stack.length - 1 : 0
        ] = item;
      } else {
        num_stack.push(item);
      }
    }
    if (i === len - 1 && ope_stack.length > 0) {
      // 最后一个数字 且还有运算符 => 需计算
      [ope_stack, num_stack] = compute(ope_stack, num_stack, item);
    }
  } // for end
  return num_stack.pop();
}
// console.log("9+(3-1)*3+8/2 = ", main("9+(3-1)*3+8/2"));
// console.log("220+(3-1)*3+10+2 = ", main("220+(3-1)*3+10+2"));
// console.log(
//   "220+[(3-1)*3+1-2]*5*(12 - 2)/2+10+2 = ",
//   main("220+[(3-1)*3+1-2]*5*(12 - 2)/2+10+2")
// ); // 357
// console.log(
//   "123/3*12*(32-2)/2+[2+12*(3+1)+(36-21)/5*12] = ",
//   main("123/3*12*(32-2)/2+[2+12*(3+1)+(36-21)/5*12]")
// );