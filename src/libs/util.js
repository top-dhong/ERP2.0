import { uuid } from 'vue-uuid';
import log from './util.log.js'
import cookies from './util.cookies.js'
import { parse } from 'matchit'

let util = {
	cookies,
	log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.dateFtt = function(fmt, date,reStr) {
    switch (typeof date) {
        case "string"://这里真机传入  2020-9会出现问题(i8)
            date = new Date(date.replace(/-/g, reStr||"/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    let o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = (fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length))).toString();
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    console.log('', fmt)
    return fmt;
}
/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
	const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
	window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}
/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
	var a = document.createElement('a')
	a.setAttribute('href', url)
	a.setAttribute('target', '_blank')
	a.setAttribute('id', 'd2admin-menu-link')
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(document.getElementById('d2admin-menu-link'))
}
/**
 * @description 处理接口
 * @param {Array} interfaces 接口
 */
util.formatInterfaces = function (interfaces) {
	let i = {}
	i["GET"] = interfaces.filter(s => s.method.toUpperCase() === "GET").map(s => parse(s.path))
	i["POST"] = interfaces.filter(s => s.method.toUpperCase() === "POST").map(s => parse(s.path))
	i["PUT"] = interfaces.filter(s => s.method.toUpperCase() === "PUT").map(s => parse(s.path))
	i["DELETE"] = interfaces.filter(s => s.method.toUpperCase() === "DELETE").map(s => parse(s.path))
	return i
}

/**
 * @description json结构数据转树形菜单结构
 * @param {data}  json数据包 
 * @param {attr} 自定属性
 */
util.listToTree = function (data, attr) {
	let resData = data;
	let tree = [];
	for (let i = 0; i < resData.length; i++) {
		if (resData[i][attr.parentId] === attr.rootId) {
			let obj = {
				id: resData[i][attr.id],
				lable: resData[i][attr.name],
				children: []
			};
			tree.push(obj);
			resData.splice(i, 1);
			i--;
		}
	}
	run(tree);
	function run(chiArr) {
		if (resData.length !== 0) {
			for (let i = 0; i < chiArr.length; i++) {
				for (let j = 0; j < resData.length; j++) {
					if (chiArr[i].id == resData[j][attr.parentId]) {
						let obj = {
							id: resData[j][attr.id],
							lable: resData[j][attr.name],
							children: []
						};
						chiArr[i].children.push(obj);
						resData.splice(j, 1);
						j--;
					}
				}
				run(chiArr[i].children);
			}
		}
	}
	return tree;
}
/**
 * @description 根据属性完整生成树形菜单
 * @param {data}  json数据包 
 * @param {attr} 自定属性
 * @param {attr2} 指定 rootId id parentId 的键值
 * @param {leve} 指定 生成树展开层级数
 */
util.listToTreePlus = function (data, attr, attr2, leve) {
	let resData = data;
	let tree = [];
	let extree = [];
	for (let i = 0; i < resData.length; i++) {
		if (resData[i][attr2.parentId] === attr2.rootId) {
			let obj = {};
			//根据自定属性设置树形的值
			for (let key in attr) {
				obj[key] = resData[i][attr[key]];
			}
			obj['children'] = [];
			tree.push(obj);
			resData.splice(i, 1);
			i--;
		}
	}
	run(tree);
	function run(chiArr) {
		if (resData.length !== 0) {
			for (let i = 0; i < chiArr.length; i++) {
				for (let j = 0; j < resData.length; j++) {
					if (chiArr[i][attr2.id] == resData[j][attr2.parentId]) {
						let obj = {};
						//根据自定属性设置树形的值
						for (let key in attr) {
							//console.log(2,obj2[key],attr[key])
							obj[key] = resData[j][attr[key]];
						}
						obj['children'] = [];
						chiArr[i].children.push(obj);
						if (leve && leve > 0) { extree.push(obj[attr2.id]); leve--; }
						resData.splice(j, 1);
						j--;
					}
				}
				run(chiArr[i].children);
			}
		}
	}
	return { tree, extree }
}
/**
 * @description 无自定属性  直接根据id层级关系生成树形菜单
 * @param {data}  json数据包 
 */
util.listToTreeOne = function listToTree(data, attr) {
	data.forEach(element => {
		let parentId = element[attr.parentId];
		if (parentId !== 0) {
			data.forEach(ele => {
				if (ele.id == parentId) { //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
					if (!ele.children) {
						ele.children = [];
					}
					ele.children.push(element);
				}
			});
		}
	});
	//data = data.filter(ele => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
	console.log(1, data)
	return data;
}
//全局广播
let broadcast = {
	eventList: {},
	on: function (event, func) {
		broadcast.eventList[event] = func;
	},
	send: function (event, data) {
		if (typeof broadcast.eventList[event] != "undefined") {
			broadcast.eventList[event](data);
		}
	}
};
util.broadcast = broadcast;

//判断对象数组中是否包含该GUID对象
//arry  [{GUID}]
util.ObjArryIncludes = function (arry, GUID) {
	// let tmpArry = arry.map((val)=>{return val.GUID==GUID})
	// return !tmpArry.includes(true)
	let idx = -1
	for (let i = 0; i < arry.length; i++) {
		if (GUID == arry[i].GUID) {
			idx = i
		}
	}
	return idx

}
//数组转逗号拼接的字串(一维数组/一维对象数组)
//array:必须  bo:是否需要加引号,非必须  pop:一维数组属性,非必须   
//例: ["转正","离职"] return '转正','离职'  pop不传
//例: [{guid:'1',username:'张三'},{guid:'2',username:'李四'}]   pop传username  return '张三','李四' 
util.ArryToJoinStr = function (arry, bo, pop) {
	//if(!arry){arry=new Array()}
	if (pop) { arry = arry.map((v) => { return v[pop] }) }
	if (0 == arry.length) { return `` }
	if (bo) {
		return "'" + arry.join("','") + "'"
	} else {
		return arry.join(",")
	}

}

util.deepClone = function (data) {
	// var type = typeof(data);
	// var obj;
	// if(type === 'Array'){
	//     obj = [];
	// } else if(type === 'Object'){
	//     obj = {};
	// } else {
	//     //不再具有下一层次
	//     return data;
	// }
	// if(type === 'Array'){
	//     for(var i = 0, len = data.length; i < len; i++){
	//         obj.push(this.deepClone(data[i]));
	//     }
	// } else if(type === 'Object'){
	//     for(var key in data){
	//         obj[key] = this.deepClone(data[key]);
	//     }
	// }
	//return obj;
	return JSON.parse(JSON.stringify(data))
}

util.newGUID = function () {
	let GUID = uuid.v4().replace(/-/g, "").toLocaleUpperCase()
	console.log('GUID=>',GUID)
	return GUID
}
//数组集合增加
util.addArray = function (arr, oneArr) {
	oneArr["isModify"] = 1;
	arr.push(oneArr)
	return arr;
}

//数组集合修改
util.upArray = function (arr, idx, oneArr) {
	let tmpArr = arr[idx];
	oneArr["isModify"] = 1;
	tmpArr = oneArr;
	arr[idx] = tmpArr;
	return arr;
}

//数组集合删除
util.delArray = function (arr, idx) {
	let tmpArr = arr[idx];
	tmpArr["isModify"] = 2;
	arr[idx] = tmpArr;
	return arr;
}
//数组集合删除全部
util.delAllArray = function (arr) {
	let tmpArr = [];
	arr.forEach((item) => { item.isModify = 2; tmpArr.push(item); })
	return tmpArr
}
//数组集合 过滤isModify==0 的数据不提交
util.filterArray = function (arr) {
	//return arr.map((item)=>{if(item.isModify!=1){return item}})
	let tmpArr = [];
	arr.forEach((item) => { if (item.isModify != 0) { tmpArr.push(item) } })
	return tmpArr
}
//导出数据的公共方法
//columnsStr  label#prop,label#prop
util.exportExcel = function (that, title, columnsStr, data) {
	title = title || (new Date().getTime() + '_' + data.length)
	let arr = columnsStr.split(',')
	let columns = arr.map((item) => { return { label: item.split('#')[0], prop: item.split('#')[1] } })
	that.$confirm(`确定导出${data.length}条数据?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		that.$export.excel({ title, columns, data })
			.then(() => {
				that.$message({ message: "导出数据成功!", type: 'success' })
			})
	})
}

//页面多开功能模块(流程)
//--------------------------start--------------
//let name = `${e.Path}Temp1`
//从opened里判断当前打开页面是否已经打开  并返回将要打开的页面name
//const canOpen = ["Temp1","Temp2","Temp3"];//允许打开的页面后缀
util.chkOpendPage = function (name, func) {
	const allOpend = [1, 2, 3, 4, 5]
	let openedValue = util.cookies.get("glb_opened");
	let opened = [];
	if (openedValue) {
		opened = JSON.parse(openedValue)
	}
	else { 
		opened = []
	}
	console.log("glb_opened=", opened)

	let tmpname = name;
	let newname = '';
	tmpname = name.substr(0,name.length-1);
	let num = 1;
	for (var i = 1; i <= allOpend.length + 1; i++) {
		num = i;
		newname = tmpname + num.toString(); 
		if (opened.indexOf(newname) < 0) {
			break;
		}
	}
	if (num > 5) {
		func({ c: 2, msg: '多开页面数已达上限,请关闭其它页面后重新打开!!' })
		return
	}
	console.log(newname);
	opened.push(newname);
	name = newname;	
	util.cookies.set("glb_opened", JSON.stringify(opened));
	func({ c: 0, name });	

	//取当前页面上一次打开的后缀num
	// let latSuffNum = opened[markName];
	// if (latSuffNum) {
	// 	let openedArr = JSON.parse(opened[markName + 'Arr']);
	// 	//剩余可打开的页面后缀num
	// 	openedArr.forEach((all) => {
	// 		allOpend.splice(allOpend.indexOf(all), 1);
	// 	})
	// 	if (allOpend.length == 0) {
	// 		func({ c: 2, msg: '多开页面数已达上限,请关闭其它页面后重新打开!!' })
	// 		return
	// 	}
	// 	let newSuffNum = allOpend[Math.floor((Math.random() * allOpend.length))]
	// 	let tmpname = name.substr(0, name.length - 1);
	// 	// let newSuffNum = (latSuffNum*1)+1 ;
	// 	opened[markName] = newSuffNum;
	// 	openedArr.push(newSuffNum);
	// 	opened[markName + 'Arr'] = JSON.stringify(openedArr);
	// 	name = tmpname + newSuffNum;
	// } else {
	// 	opened[markName] = 1
	// 	opened[markName + 'Arr'] = "[1]"
	// }
}
//--------------------------end--------------

//dh   20201104
//合并对象
//obj1 元对象
//obj2 新对象
//注意 util.assignObj({a:1,b:2},{a:3}) =合并结果为  {a:3,b:2}
util.assignObj = function (obj1, obj2) {
	// if(!obj1){obj1={};}
	// if(!obj2){obj2={};}
	// //return Object.assign(obj1||{}, obj2||{});
	// for(var pop2 in obj2) {
	// 	obj1[pop2] = obj2[pop2]
	// }
	// return obj1;
	return obj2
}
	
//dh   20201104
//查询(核心)对象中是否有带hrs对象属性的  全部取出并生成CYUserSelectValue 弹出select-user时默认显示的人员列表
//后期可能会增加  其它更多的自定义组件
//coreObj (核心)对象
//obj2 需要加载到到对象  obj2[CYUserSelectValue1]=[{GUID,UserName},{GUID,UserName}]  根据hrs1的下标来生成
util.doCoreObj = function (coreObj, obj2) {
	for(var pop in coreObj) {
		//检测带hrs  且过滤掉_V和初始化对象中的alue_hrs   
		if((pop.indexOf("hrs") != -1 )&&(pop.indexOf("_V") == -1 )&&(pop.indexOf("alue_hrs") == -1 )){
			if(coreObj[pop]){
				let tmpArrHrs = coreObj[pop].split(',')
				let tmpArrHrsV = coreObj[pop+"_V"].split(',')
				let tmpCYUserSelectValue = []
				for (let ii = 0; ii < tmpArrHrs.length; ii++) {
				  tmpCYUserSelectValue.push({ GUID: tmpArrHrs[ii], UserName: tmpArrHrsV[ii] })
				}
				obj2['CYUserSelectValue_'+pop] = tmpCYUserSelectValue
			}
		}
	}
	return obj2
}
export default util
