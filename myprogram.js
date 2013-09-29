
// Exercise 4
var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data.split('\n').length - 1);
});




// Exercise 3 -- newlines in file
// var fs = require('fs')
// 
// function t (string) {
// //  console.log("##### " + string);
// }
// 
// t(process.argv);
// 
// var filename = process.argv[2];
// 
// t(filename);
// 
// // if (fs.existsSync(p)) {
// // 	var fd = fs.openSync(p, 'r');
// // //	var 
// // }
// // 
// // for (var i = 2; i < a.length; i++) {
// // 	n += Number(a[i]);
// // }
// 
// var b = fs.readFileSync(filename,'utf8');
// 
// t(b);
// 
// //console.log(b.toString().split('\n').length - 1);
// 
// console.log(fs.readFileSync(filename,'utf8').split('\n').length - 1);
// 




// Exercise 2 -- sum args
//
// var a = process.argv;
// 
// console.log(a);
// 
// var n = 0;
// for (var i = 3; i <= a.length; i++) {
// 	console.log(n);
// 	n += Number(a[i]);
// }
// 
// 
// console.log(n);
