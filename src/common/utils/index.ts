const moveFile = require('move-file');
const path = require('path');
export class FileUtils {
  static async moveFile(source, destination) {
    await moveFile(source, destination);
  }
  static mergePath(...args: any[]) {
    return path.join(...args);
  }
  static getBaseName(file) {
    return path.basename(file);
  }
}
