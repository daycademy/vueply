import { FileState } from '@/store/modules/types';
import FileModel from '@/store/models/FileModel';
import { State } from '@/store/types';

const addFile = ({ state }: State<FileState>, fileModel: FileModel) => {
  state.files.push(fileModel);
};

const updateSelectedFile = ({ state }: State<FileState>, name: string) => {
  state.selectedFile = name;
};

const deleteFile = ({ state }: State<FileState>, name: string) => {
  state.files = state.files.filter((file) => file.name !== name);
};

export default {
  addFile,
  updateSelectedFile,
  deleteFile,
};
