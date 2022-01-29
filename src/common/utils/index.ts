
const moveFile = require('move-file');
const path = require('path');
export class FileUtils{
   static async moveFile(source, destination){
        await moveFile(source, destination);
    }
  static mergePath(...paths){
    return path.join(paths)
  }
  static getBaseName(file){
    return path.basename(file);
  }

}
