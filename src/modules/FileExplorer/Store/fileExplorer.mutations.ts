import { FileState } from '@/store/modules/types';
import FileModel from '@/store/models/FileModel';
import { State } from '@/store/types';

const addFile = ({ state }: State<FileState>, fileModel: FileModel) => {
  state.files.push(fileModel);
};

const updateSelectedFile = ({ state }: State<FileState>, name: string) => {
  state.selectedFile = name;
};

const deleteFile = (state: State<FileState>, name: string) => {
  state.state.files = state.state.files.filter((file) => file.name !== name);
  if (state.state.files.length !== 0) {
    updateSelectedFile(state, state.state.files[0].name);
  }
};

export default {
  addFile,
  updateSelectedFile,
  deleteFile,
};
