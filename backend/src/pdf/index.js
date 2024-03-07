import {asyncHandler} from '../utils/asyncHandler.js'
import path from 'path'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import PDFDocument from 'pdfkit-table'
import fs from 'fs'
import { log } from 'console';

const getCurrentDate=()=>{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const currentDate = year+'-'+month+'-'+day
    const currentTime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    //console.log(currentDate+' '+currentTime);
    return currentDate+' '+currentTime
}

const generateTablePdf = async(filename,data,header,tableHeaders)=>{
    try {
        const doc = new PDFDocument({ bufferPages: true, size: 'A4' });
        doc.pipe(fs.createWriteStream(`./public/pdf/${filename}.pdf`));
        doc.fontSize(24).text('EduSpace',{align: 'center'}).moveDown(0.5)
        doc.fontSize(20).text(`${header}`, { align: 'center' }).moveDown(1);
        doc.fontSize(10).text(`[${getCurrentDate()}]`,{align:'right'}).moveDown(0.5)
        const table = {
            headers: tableHeaders,
            rows: []
        }
        for(let student of data){
            table.rows.push(Object.values(student))
        }
        await doc.table(table);
        doc.fontSize(15).moveDown(1)
        doc.fontSize(15).text("___________________",{align:'right'}).moveDown(0.5)
        doc.fontSize(10).text('[Signature & Name]',{align:'right'}).moveDown(0.5)
        doc.end();
    } catch (error) {
        console.log(error);
    }
}

export{
    generateTablePdf
}