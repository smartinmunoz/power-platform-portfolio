
function main(workbook: ExcelScript.Workbook): {
  totalRecords: number;
  primaryRecords: number;
  associatedRecords: number;
} {
  const sheet = workbook.getWorksheet("Input");

  if (!sheet) {
    throw new Error("Worksheet 'Input' was not found.");
  }

  const table = sheet.getTable("InputRecords");

  if (!table) {
    throw new Error("Table 'InputRecords' was not found.");
  }

  const values = table.getRangeBetweenHeaderAndTotal().getValues();
  const headers = table.getHeaderRowRange().getValues()[0];
  const typeIndex = headers.indexOf("RecordType");

  if (typeIndex === -1) {
    throw new Error("Column 'RecordType' was not found.");
  }

  let primaryRecords = 0;
  let associatedRecords = 0;

  for (const row of values) {
    const recordType = String(row[typeIndex]).trim().toUpperCase();

    if (recordType === "T") {
      primaryRecords++;
    } else if (recordType === "B") {
      associatedRecords++;
    }
  }

  return {
    totalRecords: values.length,
    primaryRecords,
    associatedRecords
  };
}
