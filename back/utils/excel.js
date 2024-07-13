const excelJS = require('exceljs');
const path = require('path');
const logger = require('./logger');

async function createExcel(data, columns, filename, res) {
  if (!data || !columns) {
    res.status(400).send('Bad Request: Data and columns are required.');
    return;
  }

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: 'center' },
  };

  worksheet.columns = columns.map((column) => ({
    ...column,
    style: {
      ...column.style,
      alignment: { horizontal: column.horizontal ?? 'left' },
      width: column.width || 15,
    },
  }));

  worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
    cell.style = headerStyle;
  });

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  worksheet.columns.forEach(function (column, i) {
    let maxLength = column.width ?? 15;
    column.eachCell({ includeEmpty: true }, function (cell) {
      let columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);

  try {
    await workbook.xlsx.write(res);

    logger.info('Excel file successfully sent');

    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  createExcel,
};
