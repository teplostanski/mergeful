"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeText = exports.handleReadError = exports.handleWriteError = exports.writeToFile = exports.processData = exports.readDataFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Reads data from a file.
 * @param data - Path to the file.
 * @returns File content as a string.
 */
function readDataFromFile(data) {
    if (fs_1.default.existsSync(data)) {
        return fs_1.default.readFileSync(data, 'utf-8');
    }
    else {
        throw new Error(`File does not exist: ${data}`);
    }
}
exports.readDataFromFile = readDataFromFile;
/**
 * Processes data based on the provided function.
 * @param data - Data to be processed.
 * @param processFn - Function to process data.
 * @returns Processed data as a string.
 */
function processData(data, processFn) {
    if (processFn) {
        return processFn(data);
    }
    return typeof data === 'object'
        ? JSON.stringify(data, null, 2)
        : String(data);
}
exports.processData = processData;
/**
 * Writes content to a file.
 * @param fileName - Name of the output file.
 * @param content - Content to be written to the file.
 */
function writeToFile(fileName, content) {
    try {
        fs_1.default.writeFileSync(fileName, content, 'utf-8');
        console.log(`File ${fileName} generated successfully.`);
    }
    catch (error) {
        handleWriteError(error);
    }
}
exports.writeToFile = writeToFile;
/**
 * Handles errors that occur during the write operation.
 * @param error - The error that occurred during writing.
 */
function handleWriteError(error) {
    if (error instanceof Error) {
        // Critical error during file writing, throw to signal a critical failure.
        throw new Error(`Error writing to file: ${error.message}`);
    }
    else {
        // Unknown error during file writing, throw to signal a critical failure.
        throw new Error('Unknown error writing to file');
    }
}
exports.handleWriteError = handleWriteError;
/**
 * Handles errors that occur during the read operation.
 * @param error - The error that occurred during reading.
 */
function handleReadError(error) {
    if (error instanceof Error) {
        // Non-critical error during file reading, log to console and continue execution.
        const customError = {
            message: error.message,
        };
        console.error(`Error: ${customError.message}`);
    }
    else {
        // Unknown error during file reading, log to console and continue execution.
        console.error('It never happened before, and here we go again.');
    }
}
exports.handleReadError = handleReadError;
/**
 * Inserts data into the init file based on the provided options.
 * @param options - Options for the includeText function.
 */
function includeText(options) {
    try {
        // Check if either "text" or "path" is provided
        if (!options.data.text && !options.data.path) {
            throw new Error('Either "text" or "path" must be provided.');
        }
        // Read data from file or use provided data
        const initData = options.data.text !== undefined
            ? options.data.text
            : readDataFromFile(options.data.path);
        // Process data before insertion
        const processedData = processData(initData, options.processFn);
        // Read the init file
        let initFileContent = fs_1.default.readFileSync(options.initFilePath, 'utf-8');
        // Replace the label in the init file
        initFileContent = initFileContent.replace(options.label, processedData);
        // Write to the output file
        writeToFile(options.outputFileName, initFileContent);
    }
    catch (error) {
        // Handle errors during the process
        handleReadError(error);
    }
}
exports.includeText = includeText;
