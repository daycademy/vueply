export default class ProjectFileLink {
  displayName: string;

  projectName: string;

  fileTypes: Array<string>;

  constructor() {
    this.displayName = '';
    this.projectName = '';
    this.fileTypes = [];
  }
}
