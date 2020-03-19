export default class FileModel {
  name: String;
  type: String;
  code?: String;

  constructor() {
    this.name = '';
    this.type = '';
    this.code = '';
  }
}
