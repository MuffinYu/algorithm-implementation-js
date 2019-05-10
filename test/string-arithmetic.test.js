// const assert = require("assert");
const main = require("../algorithm/string-arithmetic");
var expect = require("chai").expect;

describe('算法实现测试：计算表达式', () => {
  describe('基础四则运算、多位数测试用例：', () => {
    const list = [
      {
        expression: "9+2*3-2+8/2",
        value: 17
      },
      {
        expression: "4/2*3-2+30/2+12",
        value: 31
      },
      {
        expression: "12-123*2+53-18/3",
        value: -187
      },
      {
        expression: "128/32*361-210/70+1230/2+12112",
        value: 14168
      },
    ];
    list.forEach(({ expression, value }) => {
      it(`${expression} = ${value}`, () => {
        expect(main(expression)).to.equal(value);
      });
    })
  });

  describe('含有括号运算测试用例：', () => {
    const list = [
      {
        expression: "220+(3-1)*3+10+2",
        value: 238
      },
      {
        expression: "[(30-2)+(3-1)*2*3/2*(5-3)/3]*3+(12 - 2)/5",
        value: 98
      },
      {
        expression: "123/3*12*(32-2)/2+[2+12*(3+1)+(36-21)/5*12]",
        value: 7466
      },
      {
        expression: "{[(12-1)*6/3+(7-2)/5]/2*4+(123- 124)*12}/2*4+123/3",
        value: 109
      }
    ];

    list.forEach(({ expression, value }) => {
      it(`${expression} = ${value}`, () => {
        expect(main(expression)).to.equal(value);
      });
    });
  });
  // it("220+(3-1)*3+10+2 =  238", () => {
  //   expect(main("220+(3-1)*3+10+2")).to.equal(238);
  // });
  // it("[(30-2)+(3-1)*2*3/2*(5-3)/3]*3+(12 - 2)/5 = 98", () => {
  //   expect(main("[(30-2)+(3-1)*2*3/2*(5-3)/3]*3+(12 - 2)/5")).to.equal(98);
  // });
})