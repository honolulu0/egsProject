let $math = require('mathjs');  //网上查询得来
let arithmetic= { 
     add() {
       return comp('add', arguments)
     },
     subtract() {
       return comp('subtract', arguments)
     },
     multiply() {
       return comp('multiply', arguments)
     },
     divide() {
       return comp('divide', arguments)
     } ,
	 evaluate(arg) {
	   return parseFloat($math.evaluate(arg)).toFixed(2)
	 } ,
	 formatNumberRgx(strNum) {
	   var parts = strNum.split(".");
	   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	   return parts.join(".");
	 } 
}

// math.evaluate('12 / (2.3 + 0.7)');    // 4
// math.evaluate('12.7 cm to inch');     // 5 inch
// math.evaluate('sin(45 deg) ^ 2');     // 0.5
// math.evaluate('9 / 3 + 2i');          // 3 + 2i
// math.evaluate('det([-1, 2; 3, 1])');  // -7

function comp(_func, args) {
	 
  let t = $math.chain($math.bignumber(args[0]));
  for (let i=1; i<args.length; i++) {
    t = t[_func]($math.bignumber(args[i]))
	
  }
  // 防止超过6位使用科学计数法
  return parseFloat(t.done()).toFixed(2)
} 

export default arithmetic;