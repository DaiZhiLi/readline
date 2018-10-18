var fs = require("fs");
var path = require("path");
var readline = require('readline');
var os = require('os');

var _dir = "F:/test/view/";    //要检查的文件目录地址

fileShow(_dir);

function  fileShow(filePath) {
    fs.readdir(filePath,function (err,files) {
        if(err){
            console.error(err);
        }
        files.forEach(function (filename) {
            var filedir = path.join(filePath,filename);
            fs.stat(filedir,function (error,stats) {
                if(error){
                    console.error(error);
                }
                var isFile = stats.isFile();
                var isDir = stats.isDirectory();
                if(isFile){
                    //console.log(filedir);
                    fs.readFile(filedir,function (err,data) {
                        if(err){
                            console.log(err);
                        }
                        var _str = data.toString();
                        var reg = /[\u4e00-\u9fa5]+/g;
                        console.log(filedir+':'+'\n'+_str.match(reg));
                    });
                    consoleReadline(filedir);
                }
                if(isDir){
                    fileShow(filedir);
                }
            })
        });
    })
}

var fWriteFile = './dir/copy/view.txt'; //输出的文件地址
var fWrite = fs.createWriteStream(fWriteFile);
function consoleReadline(_file){
    var fReadFile = _file;
    var fRead = fs.createReadStream(fReadFile);
    var objReadline = readline.createInterface({
        input:fRead,
    });

    var index = 1;
    objReadline.on('line',(line)=>{
        var _str = line;
        var reg = /[\u4e00-\u9fa5]+/g;
        if(_str.match(reg)!=null){
            //console.log(index,line);
            var tmp =_file+ ' line'+index.toString()+':'+line;
            fWrite.write(tmp+os.EOL);
        }
        index++;
    });
    objReadline.on('close',()=>{
        console.log('readline close...');
    });
}


