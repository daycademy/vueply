export default class FileModel {
  name: String;
  type: String;
  project: String;
  code?: String;

  constructor() {
    this.name = '';
    this.type = '';
    this.project = '';
    this.code = '';
  }
}
