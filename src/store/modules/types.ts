import FileModel from '../models/FileModel';
import ProjectFileLink from '../models/ProjectFileLink';

export interface FileState {
  files: Array<FileModel>;
  selectedFile: string;
}

export interface ProjectState {
  currentProject: string;
  projectFilesLink: Array<ProjectFileLink>;
}
