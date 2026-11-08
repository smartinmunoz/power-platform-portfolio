
# Office Scripts

This folder contains two Office Scripts developed for a fictional SharePoint and Excel automation demonstration.

## Available Scripts

### process-records.ts

Reads records from the `Input` worksheet.

- Detects column headers dynamically.
- Extracts records from the used range.
- Skips completely empty rows.
- Returns the extracted records as a JSON string.

### populate-export-template.ts

Populates an existing Excel export template.

- Receives records through a JSON string parameter.
- Uses the `Export` worksheet.
- Writes selected fields starting at cell B15.
- Preserves the predefined template headers.
- Returns the number of records written.

## Sample Files

Both scripts can be tested using the files in the `sample-data` folder:

- `sample-records.xlsx`
- `export-template.xlsx`

## Power Automate Integration

Power Automate orchestrates the process, creates the export workbook from a template and passes record data between the scripts.

The demonstration uses a simplified data structure and fictional records.

## Security

No corporate code, credentials, internal URLs or confidential information are included.
