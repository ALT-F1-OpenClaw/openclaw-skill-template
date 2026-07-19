import { posix, win32 } from 'node:path';

export function normalizeRelativePath(input) {
  if (!input) return '';

  const original = String(input);
  const slashPath = original.replaceAll('\\', '/');
  if (posix.isAbsolute(slashPath) || win32.isAbsolute(original)) {
    throw new Error('Absolute paths are not allowed');
  }

  if (slashPath.split('/').includes('..')) {
    throw new Error('Path traversal is not allowed');
  }

  return posix.normalize(slashPath).replace(/^\.\/+/, '');
}
