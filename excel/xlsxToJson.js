/*
 * @Author: wsy
 * @Date: 2024/5/22 15:04
 * @LastEditors:
 * @LastEditTime: 2024/5/22 15:04
 * @FilePath: excel
 * @Description:
 */
const XLSX = require('xlsx');
const fs = require('fs')

// 读取 Excel 文件
const workbook = XLSX.readFile('./test.xlsx');

// 获取第一个工作表
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// 将工作表转换为 JSON 对象
const data = XLSX.utils.sheet_to_json(worksheet, {
    header: 1
});

let res = []
console.log(data)
data.forEach(item => {
    res.push({
        id: item[5],
        "所属市公司": item[0],
        "所属县公司": item[1],
        "所属班组": item[2],
        "coordinates": [item[3], item[4]],
    })
})
console.log(res)
fs.writeFile('./json/output.json', JSON.stringify(res, null, '\t'), (err) => {
    if(err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file created successfully!');
    }
});
