import {asyncHandler} from '../utils/asyncHandler.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
import PDFNet from '@pdftron/pdfnet-node'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const convertFromOffice = asyncHandler(async(req,res)=>{
    const filename = 'studentList'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const inputPath = path.resolve(__dirname,`./files/${filename}.docx`)
    const outputPath = path.resolve(__dirname,`./files/${filename}.pdf`)
    
    const pdfdoc = await PDFNet.PDFDoc.create()
    await pdfdoc.initSecurityHandler()
    await PDFNet.Convert.toPdf(pdfdoc, inputPath)
    pdfdoc.save(outputPath,PDFNet.SDFDoc.SaveOptions.e_linearized)

    return res
    .status(200)
    .json(
        new ApiResponse(200,' ',"success")
    )
})

export {
    convertFromOffice
}