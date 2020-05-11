import { FileState, ProjectState } from './modules/@types';

export interface RootState {
  files: FileState;
  project: ProjectState;
}

export interface State<T> {
  state: T;
}
