import fs from 'fs';
import { include } from './include';

jest.mock('fs');

describe('include function', () => {
  test('should include text when data.text is provided', () => {
    const PATH_TO_MOCK_FILE = 'path/to/mock/file.txt';
    const MOCK_INIT_FILE_CONTENT =
      'This init test file\n{{INSERT_LABEL}}\nend content into init file';
    const MOCK_DATA_TEXT = 'This is a test string.';

    const mockReadFileSync = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(MOCK_INIT_FILE_CONTENT);
    const mockWriteFileSync = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation();

    include({
      initFilePath: PATH_TO_MOCK_FILE,
      data: { text: MOCK_DATA_TEXT },
      label: '{{INSERT_LABEL}}',
      outputFileName: 'output.txt',
    });

    // Ожидаем, что readFileSync был вызван с правильным путем к файлу
    expect(mockReadFileSync).toHaveBeenCalledWith(PATH_TO_MOCK_FILE, 'utf-8');

    // Ожидаем, что writeFileSync был вызван с правильными аргументами
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'output.txt',
      `This init test file\n${MOCK_DATA_TEXT}\nend content into init file`,
      'utf-8'
    );

    // Проверяем, что mockRestore вызывается, чтобы не влиять на другие тесты
    mockReadFileSync.mockRestore();
    mockWriteFileSync.mockRestore();
  });

  test('should handle error if file does not exist', () => {
    const PATH_TO_MOCK_FILE = 'nonexistent/path/to/mock/file.txt';
    const mockReadFileSync = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => {
        throw new Error(
          `ENOENT: no such file or directory, open '${PATH_TO_MOCK_FILE}'`
        );
      });

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    include({
      initFilePath: PATH_TO_MOCK_FILE,
      data: { text: 'This is a test string.' },
      label: '{{INSERT_LABEL}}',
      outputFileName: 'output.txt',
    });

    // Ожидаем, что console.error был вызван с правильным сообщением об ошибке
    expect(mockConsoleError).toHaveBeenCalledWith(
      `Error: File does not exist: ${PATH_TO_MOCK_FILE}`
    );

    // Проверяем, что mockRestore вызывается, чтобы не влиять на другие тесты
    mockReadFileSync.mockRestore();
    mockConsoleError.mockRestore();
  });
});
