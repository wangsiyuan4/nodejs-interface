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
const workbook = XLSX.readFile('./站点坐标.xlsx');

// 获取第一个工作表
const worksheet = workbook.Sheets[workbook.SheetNames[11]];

// 将工作表转换为 JSON 对象
const data = XLSX.utils.sheet_to_json(worksheet, {
    header: 1
});

let res = []

data.forEach(item => {
    res.push({
        "name": item[0],
        "coordinates": item[1].split(',').map(val => Number(val))
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
