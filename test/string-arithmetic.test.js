const assert = require("assert");
const main = require("../algorithm/string-arithmetic");

describe('计算表达式 测试', () => {
  it("9+(3-1)*3+8/2 = 19", () => {
    assert.strictEqual(main("9+(3-1)*3+8/2"), 19);
  });
  it("220+(3-1)*3+10+2 =  238", () => {
    assert.strictEqual(main("220+(3-1)*3+10+2"), 238);
  });
  it("[(30-2)+(3-1)*2*3/2*(5-3)/3]*3+(12 - 2)/5 = 98", () => {
    assert.strictEqual(
      main("[(30-2)+(3-1)*2*3/2*(5-3)/3]*3+(12 - 2)/5"),
      98
    );
  });
})