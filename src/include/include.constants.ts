/**
 * Error messages constants.
 */
export const ERROR_MESSAGE_FILE_DOES_NOT_EXIST = (filePath: string) => `File does not exist: ${filePath}`;
export const ERROR_MESSAGE_TEXT_OR_PATH_REQUIRED = 'Either "text" or a valid "path" must be provided.';
export const ERROR_MESSAGE_WRITE_FILE = (errorMessage: string) => `Error writing to file: ${errorMessage}`;
export const ERROR_MESSAGE_UNKNOWN_WRITE = 'Unknown error writing to file.';
export const ERROR_MESSAGE_UNKNOWN_READ = 'It never happened before, and here we go again.';
export const ERROR_MESSAGE_PREFIX = 'Error: ';

/**
 * Log messages constants.
 */
export const LOG_FILE_GENERATED_SUCCESSFULLY = (fileName: string) => `File ${fileName} generated successfully.`;