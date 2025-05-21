import { folderHandler } from './folderHandler';
import { workspaceHandler } from './workspaceHandler';

export const handlers = [
  ...folderHandler,
  ...workspaceHandler,
];
