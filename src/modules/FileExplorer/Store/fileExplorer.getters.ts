import { FileState } from '@/store/modules/@types';
import FileModel from '@/store/models/FileModel';
import { State } from '@/store/@types';

const projectFiles = ({ state }: State<FileState>) => (project: string): Array<FileModel> => state
  .files.filter((file: FileModel) => file.project === project);

export default {
  projectFiles,
};
