/*
 * @Author: wsy
 * @Date: 2024/1/16 10:00
 * @LastEditors:
 * @LastEditTime: 2024/1/16 10:00
 * @FilePath: nodejs-interface/excel
 * @Description:
 */
const XLSX = require('xlsx');
const data1 = require('./json/data.json')
const data2 = require('./json/data2.json')
const data3 = require('./json/data3.json')
const data4 = require('./json/data4.json')
const workbook = XLSX.utils.book_new();
const worksheet1 = XLSX.utils.aoa_to_sheet([["摄像头ID"]].concat(data1.map(item => [item])));
const worksheet2 = XLSX.utils.aoa_to_sheet([["摄像头ID"]].concat(data2.map(item => [item])));
const worksheet3 = XLSX.utils.aoa_to_sheet([["摄像头ID"]].concat(data3.map(item => [item])));
const worksheet4 = XLSX.utils.aoa_to_sheet([["摄像头ID"]].concat(data4.map(item => [item])));
// XLSX.utils.book_append_sheet(workbook, worksheet, 'My Sheet');
// 将工作表添加到工作簿
XLSX.utils.book_append_sheet(workbook, worksheet1, '1号宿舍');
XLSX.utils.book_append_sheet(workbook, worksheet2, '2号宿舍');
XLSX.utils.book_append_sheet(workbook, worksheet3, '3号宿舍');
XLSX.utils.book_append_sheet(workbook, worksheet4, '4号宿舍');
XLSX.writeFile(workbook, '摄像头列表.xlsx');
console.log('Excel文件已生成');
