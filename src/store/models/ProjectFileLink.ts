export default class ProjectFileLink {
  displayName: string;

  projectName: string;

  fileTypes: Array<string>;

  icon: string;

  projectColor: string;

  constructor() {
    this.displayName = '';
    this.projectName = '';
    this.fileTypes = [];
    this.icon = '';
    this.projectColor = '';
  }
}
