var readline = require('readline');
var fs = require('fs');
var os = require('os');
var path = require('path');

var fReadFile = './dir/xml.txt';         //要检查的文件地址
var fWriteFile = './dir/copy/xml.txt';  //输出的文件地址
var fRead = fs.createReadStream(fReadFile);
var fWrite = fs.createWriteStream(fWriteFile);

var objReadline = readline.createInterface({
   input:fRead,
});

var index = 1;
objReadline.on('line',(line)=>{
   var _str = line;
   var reg = /[\u4e00-\u9fa5]+/g;
   if(_str.match(reg)!=null){
       console.log(index,line);
       var tmp = 'line'+index.toString()+':'+line;
       fWrite.write(tmp+os.EOL);
   }
   index++;
});
objReadline.on('close',()=>{
   console.log('readline close...');
});

