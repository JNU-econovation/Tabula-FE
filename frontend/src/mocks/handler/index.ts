import { folderHandler } from './folderHandler';
import { mypageHandler } from './mypageHandler';
import { workspaceHandler } from './workspaceHandler';

export const handlers = [
  ...folderHandler,
  ...workspaceHandler,
  ...mypageHandler,
];
