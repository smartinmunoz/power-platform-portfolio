interface ExportRecord {
    RecordType: string;
    ReferenceCode: string;
    FullName: string;
    Relationship: string;
}

function main(
    workbook: ExcelScript.Workbook,
    recordsJSON: string
): number {

    const sheet = workbook.getWorksheet("Export");

    if (!sheet) {
        throw new Error("Worksheet 'Export' not found.");
    }

    const records = JSON.parse(recordsJSON) as ExportRecord[];

    if (!Array.isArray(records)) {
        throw new Error("Expected an array of records.");
    }

    if (records.length === 0) {
        return 0;
    }

    const rows: string[][] = records.map(record => [
        String(record.RecordType ?? ""),
        String(record.ReferenceCode ?? ""),
        String(record.FullName ?? ""),
        String(record.Relationship ?? "")
    ]);

    // B15:E...
    sheet.getRangeByIndexes(
        14,
        1,
        rows.length,
        4
    ).setValues(rows);

    return rows.length;
}
