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

    
    // Parse and validate the JSON input
    let records: ExportRecord[];

    try {
        records = JSON.parse(recordsJSON) as ExportRecord[];
    } catch {
        throw new Error(
            "Invalid recordsJSON: the input must contain valid JSON."
        );
    }


    if (!Array.isArray(records)) {
        throw new Error("Expected an array of records.");
    }

    if (records.length === 0) {
        return 0;
    }

    // Validate each record structure
    for (let i = 0; i < records.length; i++) {
        const record = records[i];

        if (
            record === null ||
            typeof record !== "object" ||
            Array.isArray(record)
        ) {
            throw new Error(
                `Invalid record at position ${i + 1}: expected an object.`
            );
        }
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
