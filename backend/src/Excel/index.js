import ExcelJS  from 'exceljs'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError, } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const convertToTitle = (columnNumber)=>{
    let output = '';
    let charCode;
    while (columnNumber >= 1) {
        if (columnNumber%26 === 0) {
            charCode = 26
            columnNumber = ~~(columnNumber/26) - 1
        } else {
            charCode = columnNumber%26;
            columnNumber = ~~(columnNumber/26)
        }
        output = String.fromCharCode(charCode + 64) + output;
    }
    return output;
};

const generateExcel = asyncHandler(async(req,res)=>{
    const {data,bookName,creatorId,headers} = req.body
    console.log(data);
    getExcel({data,bookName,creatorId,headers})
    return res
    .status(200)
    .download("Attendance.xlsx","Attendance.xlsx")
})

function getExcel(data,bookName,creatorId,headers,styles=[],studentClass){
    try {
        let fname = `${bookName}.xlsx`
        const workbook = new ExcelJS.Workbook(bookName)
        workbook.creator = creatorId;
        const worksheet = workbook.addWorksheet('New Sheet');
        // const headers = Object.keys(data[0])
        let firstCell = 'A1'
        let lastCell = convertToTitle(headers.length)
        worksheet.mergeCells(`${firstCell}:${lastCell}`)
        worksheet.getCell(lastCell).value = 'EduSpace'
        firstCell = 'A2'
        lastCell = convertToTitle(headers.length)
        worksheet.columns = headers
        console.log(headers);
        
        worksheet.addRows(data)
        console.log("ppp");
        console.log(data);
        worksheet.state = 'visible'
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            cell.border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
            };
            cell.font = {
                name: 'Times New Roman',
                size: 12
            }
            });
        });
        console.log('heyy');
        workbook.xlsx.writeFile(fname)
        return true
    } catch (error) {
        return false
        console.log(error);
    }
}

export {
    getExcel,
    generateExcel
}