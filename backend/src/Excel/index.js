import ExcelJS  from 'exceljs'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError, } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
const generateExcel = asyncHandler(async(req,res)=>{
    const {data,bookName,creatorId,headers} = req.body
    console.log(data);
    const progress = getExcel({data,bookName,creatorId,headers})
    if(!progress){
        throw new ApiError(400, "Excel not generated")
    }
    return res
    .status(200)
    .download("Attendance.xlsx","Attendance.xlsx")
})

function getExcel({data,bookName,creatorId,headers,styles=[]}){
    try {
        let fname = `${bookName}.xlsx`
        const workbook = new ExcelJS.Workbook(bookName)
        workbook.creator = creatorId;
        const worksheet = workbook.addWorksheet('New Sheet');
        // const headers = Object.keys(data[0])
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