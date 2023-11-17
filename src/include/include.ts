import fs from 'fs';
import { ERROR_MESSAGE_FILE_DOES_NOT_EXIST, ERROR_MESSAGE_PREFIX, ERROR_MESSAGE_TEXT_OR_PATH_REQUIRED, ERROR_MESSAGE_UNKNOWN_READ, ERROR_MESSAGE_UNKNOWN_WRITE, ERROR_MESSAGE_WRITE_FILE, LOG_FILE_GENERATED_SUCCESSFULLY } from './include.constants';

interface CustomError {
  message: string;
}

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
export function readDataFromFile(data: string): string {
  if (fs.existsSync(data)) {
    return fs.readFileSync(data, 'utf-8');
  } else {
    throw new Error(ERROR_MESSAGE_FILE_DOES_NOT_EXIST(data));
  }
}

/**
 * Processes data based on the provided function.
 * @param data - Data to be processed.
 * @param processFn - Function to process data.
 * @returns Processed data as a string.
 */
export function processData(
  data: string | object,
  processFn?: (data: string | object) => string
): string {
  if (processFn) {
    return processFn(data);
  }
  return typeof data === 'object'
    ? JSON.stringify(data, null, 2)
    : String(data);
}

/**
 * Writes content to a file.
 * @param fileName - Name of the output file.
 * @param content - Content to be written to the file.
 */
export function writeToFile(fileName: string, content: string): void {
  try {
    fs.writeFileSync(fileName, content, 'utf-8');
    console.log(LOG_FILE_GENERATED_SUCCESSFULLY(fileName));
  } catch (error) {
    handleWriteError(error);
  }
}

/**
 * Handles errors that occur during the write operation.
 * @param error - The error that occurred during writing.
 */
export function handleWriteError(error: unknown): void {
  if (error instanceof Error) {
    // Critical error during file writing, throw to signal a critical failure.
    throw new Error(ERROR_MESSAGE_PREFIX + ERROR_MESSAGE_WRITE_FILE(error.message));
  } else {
    // Unknown error during file writing, throw to signal a critical failure.
    throw new Error(ERROR_MESSAGE_PREFIX + ERROR_MESSAGE_UNKNOWN_WRITE);
  }
}

/**
 * Handles errors that occur during the read operation.
 * @param error - The error that occurred during reading.
 */
export function handleReadError(error: unknown): void {
  if (error instanceof Error) {
    // Non-critical error during file reading, log to console and continue execution.
    const customError: CustomError = {
      message: error.message,
    };
    console.error(ERROR_MESSAGE_PREFIX + customError.message);
  } else {
    // Unknown error during file reading, log to console and continue execution.
    console.error(ERROR_MESSAGE_PREFIX + ERROR_MESSAGE_UNKNOWN_READ);
  }
}

/**
 * Inserts data into the init file based on the provided options.
 * @param options - Options for the includeText function.
 */
export function include(options: IncludeOptions): void {
  let initData: string;
  
  try {
    // Check if either "text" or "path" is provided
    if (!options.data.text && !options.data.path) {
      throw new Error(ERROR_MESSAGE_PREFIX + ERROR_MESSAGE_TEXT_OR_PATH_REQUIRED);
    }

    // Read data from file or use provided data
    if (options.data.text != null) {
      initData = String(options.data.text);
    } else if (options.data.path != null && options.data.path !== '') {
      initData = readDataFromFile(options.data.path);
    } else {
      throw new Error(ERROR_MESSAGE_PREFIX + ERROR_MESSAGE_TEXT_OR_PATH_REQUIRED);
    }
    

    // Process data before insertion
    const processedData = processData(initData, options.processFn);

    // Read the init file
    let initFileContent = fs.readFileSync(options.initFilePath, 'utf-8');

    // Replace the label in the init file
    initFileContent = initFileContent.replace(options.label, processedData);

    // Write to the output file
    writeToFile(options.outputFileName, initFileContent);
  } catch (error) {
    // Handle errors during the process
    handleReadError(error);
  }
}
