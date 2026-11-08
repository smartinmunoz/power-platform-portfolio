
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

    if (values.length < 2) {
        return JSON.stringify([]);
    }

    const headers = values[0].map(value =>
        String(value).trim()
    );

    const records: { [key: string]: string | number | boolean }[] = [];

    for (let i = 1; i < values.length; i++) {
        const row = values[i];

        const isEmpty = row.every(value =>
            value === "" || value === null
        );

        if (isEmpty) {
            continue;
        }

        const record: { [key: string]: string | number | boolean } = {};

        for (let j = 0; j < headers.length; j++) {
            if (headers[j] !== "") {
                record[headers[j]] = row[j];
            }
        }

        records.push(record);
    }

    return JSON.stringify(records);
}
