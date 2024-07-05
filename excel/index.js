/*
 * @Author: wsy
 * @Date: 2024/1/16 10:00
 * @LastEditors: 
 * @LastEditTime: 2024/1/16 10:00
 * @FilePath: nodejs-interface/excel
 * @Description: 
 */
const XLSX = require('xlsx');
const data = require('./json/data.json')
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet, 'My Sheet');
XLSX.writeFile(workbook, 'example.xlsx');
console.log('Excel文件已生成');