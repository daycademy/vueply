import FileModel from '../models/FileModel';

export interface FileState {
  files: Array<FileModel>;
  selectedFile: string;
};

export interface ProjectState {
  currentProject: string;
};
