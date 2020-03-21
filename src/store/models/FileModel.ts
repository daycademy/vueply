export default class FileModel {
  name: string;

  type: string;

  project: string;

  code?: string;

  constructor() {
    this.name = '';
    this.type = '';
    this.project = '';
    this.code = '';
  }
}
