import assert from 'node:assert/strict';
import { test } from 'node:test';

import { normalizeRelativePath } from './path-safety.mjs';

test('normalizes safe relative paths', () => {
  assert.equal(normalizeRelativePath('safe/file.txt'), 'safe/file.txt');
  assert.equal(normalizeRelativePath('./safe/file.txt'), 'safe/file.txt');
  assert.equal(normalizeRelativePath('safe\\file.txt'), 'safe/file.txt');
  assert.equal(normalizeRelativePath('safe..name.txt'), 'safe..name.txt');
});

test('rejects absolute paths across platforms', () => {
  assert.throws(() => normalizeRelativePath('/etc/passwd'), /Absolute paths/);
  assert.throws(() => normalizeRelativePath('C:\\Windows\\file'), /Absolute paths/);
  assert.throws(() => normalizeRelativePath('\\\\server\\share'), /Absolute paths/);
});

test('rejects traversal segments', () => {
  assert.throws(() => normalizeRelativePath('../secret'), /traversal/);
  assert.throws(() => normalizeRelativePath('safe/../secret'), /traversal/);
  assert.throws(() => normalizeRelativePath('safe\\..\\secret'), /traversal/);
});
