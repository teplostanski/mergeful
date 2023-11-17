"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mergeful_1 = require("./mergeful");
jest.mock('fs');
describe('includeText function', () => {
    const mockReadFileSync = jest.spyOn(fs_1.default, 'readFileSync');
    const mockWriteFileSync = jest.spyOn(fs_1.default, 'writeFileSync');
    beforeEach(() => {
        mockReadFileSync.mockClear();
        mockWriteFileSync.mockClear();
    });
    test('should include text when data is a string', () => {
        // Мокаем чтение файла только для этого теста
        mockReadFileSync.mockReturnValueOnce('This init test file\n{{INSERT_LABEL}}\nend content into init file');
        // Запускаем функцию includeText
        (0, mergeful_1.includeText)({
            initFilePath: 'path/to/init/file.txt',
            data: 'This is a test string.',
            label: '{{INSERT_LABEL}}',
            outputFileName: 'output.txt',
        });
        // Ожидаем, что readFileSync был вызван с правильным путем к файлу
        expect(mockReadFileSync).toHaveBeenCalledWith('path/to/init/file.txt', 'utf-8');
        // Ожидаем, что writeFileSync был вызван с правильными аргументами
        expect(mockWriteFileSync).toHaveBeenCalledWith('output.txt', 'This init test file\nThis is a test string.\nend content into init file', 'utf-8');
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});
