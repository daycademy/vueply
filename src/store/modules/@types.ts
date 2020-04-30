import FileModel from '../models/FileModel';
import ProjectFileLink from '../models/ProjectFileLink';
import FileType from '../models/FileType';

export interface FileState {
  files: Array<FileModel>;
  selectedFile: string;
  fileTypes: Array<FileType>;
}

export interface Icon {
  icon: string;
  fileType: string;
}

export interface ProjectState {
  currentProject: string;
  icons: Array<Icon>;
  projectFilesLink: Array<ProjectFileLink>;
}
