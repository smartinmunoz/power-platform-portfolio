
function main(workbook: ExcelScript.Workbook): string {
    const sheet = workbook.getWorksheet("Input");

    if (!sheet) {
        throw new Error("Worksheet 'Input' not found.");
    }

    const usedRange = sheet.getUsedRange();

    if (!usedRange) {
        throw new Error("The worksheet is empty.");
    }

    const values = usedRange.getValues();

    const headers = values[0].map(value =>
        String(value).trim()
    );

    // Validate required columns
    const requiredHeaders = [
        "RecordType",
        "ReferenceCode",
        "FullName",
        "Relationship"
    ];

    const missingHeaders = requiredHeaders.filter(
        header => !headers.includes(header)
    );

    if (missingHeaders.length > 0) {
        throw new Error(
            `Missing required columns: ${missingHeaders.join(", ")}`
        );
    }

    // Detect duplicate column headers
    const nonEmptyHeaders = headers.filter(
        header => header !== ""
    );

    const duplicateHeaders = nonEmptyHeaders.filter(
        (header, index) =>
            nonEmptyHeaders.indexOf(header) !== index
    );

    if (duplicateHeaders.length > 0) {
        throw new Error(
            `Duplicate column headers: ${
                [...new Set(duplicateHeaders)].join(", ")
            }`
        );
    }

    // Return an empty array when only headers exist
    if (values.length < 2) {
        return JSON.stringify([]);
    }


    // Extract records
    const records: {
        [key: string]: string | number | boolean
    }[] = [];

    for (let i = 1; i < values.length; i++) {
        const row = values[i];

        // Skip completely empty rows
        const isEmpty = row.every(value =>
            value === "" || value === null
        );

        if (isEmpty) {
            continue;
        }

        const record: {
            [key: string]: string | number | boolean
        } = {};

        for (let j = 0; j < headers.length; j++) {
            if (headers[j] !== "") {
                record[headers[j]] = row[j];
            }
        }


        // Validate required values for each record
        const requiredFields = [
            "RecordType",
            "ReferenceCode",
            "FullName"
        ];

        const missingFields = requiredFields.filter(field =>
            String(record[field] ?? "").trim() === ""
        );

        if (missingFields.length > 0) {
            throw new Error(
                `Row ${i + 1}: Missing required values: ${missingFields.join(", ")}`
            );
        }

        // Validate supported record types
        const recordType = String(record["RecordType"]).trim();

        if (recordType !== "T" && recordType !== "B") {
            throw new Error(
                `Row ${i + 1}: Unsupported RecordType '${recordType}'. Expected 'T' or 'B'.`
            );
        }

        // Normalize the record type
        record["RecordType"] = recordType;

        records.push(record);
    }

    return JSON.stringify(records);
}

  
