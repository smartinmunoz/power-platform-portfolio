function main(workbook: ExcelScript.Workbook): {
  totalRecords: number;
  primaryRecords: number;
  associatedRecords: number;
} {
  const sheet = workbook.getWorksheet("Input");

  if (!sheet) {
    throw new Error("Worksheet 'Input' was not found.");
  }

  const usedRange = sheet.getUsedRange();

  if (!usedRange) {
    throw new Error("The worksheet is empty.");
  }

  const values = usedRange.getValues();

  const headers = values[0].map(value => String(value));
  const typeIndex = headers.indexOf("RecordType");

  if (typeIndex === -1) {
    throw new Error("Column 'RecordType' was not found.");
  }

  let primaryRecords = 0;
  let associatedRecords = 0;

  for (let i = 1; i < values.length; i++) {
    const recordType = String(values[i][typeIndex])
      .trim()
      .toUpperCase();

    if (recordType === "T") {
      primaryRecords++;
    } else if (recordType === "B") {
      associatedRecords++;
    }
  }

  return {
    totalRecords: primaryRecords + associatedRecords,
    primaryRecords,
    associatedRecords
  };
}
