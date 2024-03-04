import ExcelJS  from 'exceljs'

const data = [
    {
        student_id: 1,
        student_name: "Yash",
        Attendance: 75
    },
    {
        student_id: 2,
        student_name: "Ritesh",
        Attendance: 80
    },
    {
        student_id: 3,
        student_name: "Soham",
        Attendance: 85
    }
]


function getExcel({data,bookName,creatorId,styles=[]}){
    let fname = `${bookName}.xlsx`
    const workbook = new ExcelJS.Workbook(bookName)
    workbook.creator = creatorId;
    const worksheet = workbook.addWorksheet('New Sheet');
    const headers = Object.keys(data[0])
    worksheet.addRows(headers)
    
    worksheet.addRows(data)
    worksheet.state = 'visible'
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
    row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
        cell.border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
        };
        });
    });
    console.log('heyy');
    // workbook.xlsx.writeFile(fname)
    workbook.xlsx.writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `./${Date.now()}_feedback.xlsx`))
    .catch(err => console.log('Error writing excel export', err))
}

export {
    getExcel
}