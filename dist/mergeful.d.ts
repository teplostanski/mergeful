interface IncludeOptions {
    /**
     * Path to the init file.
     */
    initFilePath: string;
    /**
     * Data to be inserted, can be a string or an object.
     */
    data: {
        text?: string;
        path?: string;
    };
    /**
     * Label to replace in the init file.
     */
    label: string;
    /**
     * Output file name.
     */
    outputFileName: string;
    /**
     * Function to process data before insertion.
     */
    processFn?: (data: string | object) => string;
}
/**
 * Reads data from a file.
 * @param data - Path to the file.
 * @returns File content as a string.
 */
export declare function readDataFromFile(data: string): string;
/**
 * Processes data based on the provided function.
 * @param data - Data to be processed.
 * @param processFn - Function to process data.
 * @returns Processed data as a string.
 */
export declare function processData(data: string | object, processFn?: (data: string | object) => string): string;
/**
 * Writes content to a file.
 * @param fileName - Name of the output file.
 * @param content - Content to be written to the file.
 */
export declare function writeToFile(fileName: string, content: string): void;
/**
 * Handles errors that occur during the write operation.
 * @param error - The error that occurred during writing.
 */
export declare function handleWriteError(error: unknown): void;
/**
 * Handles errors that occur during the read operation.
 * @param error - The error that occurred during reading.
 */
export declare function handleReadError(error: unknown): void;
/**
 * Inserts data into the init file based on the provided options.
 * @param options - Options for the includeText function.
 */
export declare function includeText(options: IncludeOptions): void;
export {};
//# sourceMappingURL=mergeful.d.ts.map