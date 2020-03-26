import FileModel from '../models/FileModel';
import ProjectFileLink from '../models/ProjectFileLink';
import FileType from '../models/FileType';

export interface FileState {
  files: Array<FileModel>;
  selectedFile: string;
  fileTypes: Array<FileType>;
}

export interface ProjectState {
  currentProject: string;
  projectFilesLink: Array<ProjectFileLink>;
}
