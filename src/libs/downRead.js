/**
 * 配置支持打开的文档类型
 * 文档后缀统一配置大写
 */
import util from './util.js'
let doActionArr = [{
		do: 'openDocument',
		str: []//[ 'DOC', 'DOCX', 'XLSX', 'XLS', 'PPT', 'PPTX']
	},
	{
		do: 'openWeb',
		str: ['JPG', 'JPEG', 'PNG', 'BMP','TXT','TEXT','PDF']
	},
	{
		do: 'openOffice',
		str: [ 'DOC', 'DOCX', 'XLSX', 'XLS', 'PPT', 'PPTX']
	},
	// {
	// 	do: 'openZip',
	// 	str: ['ZIP']
	// },
	//{do:'openRar',str:['RAR']},
]
var downRead = function(that,url) {
	console.log(url)
	if(!url){
		that.$message({message: '无效URL',type: 'error'})
		return
	}
	const loading = that.$loading({
	          lock: true,
	          text: 'Loading',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
			// loading.close();
	let fileType = url.substring(url.lastIndexOf(".") + 1, url.length);
	let doAction = ''
	for (const ar in doActionArr) {
		if (doActionArr[ar].str.includes(fileType.toLocaleUpperCase())) {
			doAction = doActionArr[ar].do
		}
	}
	//没有配置就默认浏览器打开
	if (!doAction) {
		util.open(url);
		loading.close();
		return
	}
	if ('openDocument' == doAction) {
		that.$message({message: '暂不支持打开',type: 'error'})
		loading.close();
	}else if ('openOffice' == doAction) {
		util.open(url);
		//暂不可用  需要购买mmp  util.open(`http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=${url}`);
		loading.close();
	} else if ('openWeb' == doAction) {
		util.open(url);
		loading.close();
	}
}

export {
	downRead
}
