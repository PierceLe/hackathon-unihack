const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
require('dotenv').config(); // Đọc biến môi trường từ .env

// Cấu hình repo từ xa
const REPO_DIR = path.join(__dirname, '../repo');
const REMOTE_URL = 'https://github.com/PierceLe/scaffold-student-management';
const REMOTE_NAME = 'origin';
const DEFAULT_BRANCH = 'main';

// Xác thực GitHub với Personal Access Token (PAT)
const auth = {
  username: process.env.GITHUB_USERNAME,
  password: process.env.GITHUB_PAT,
};

// 🛠️ **Clone repository từ GitHub (nếu chưa có)**
const cloneRepository = async () => {
  if (!fs.existsSync(REPO_DIR)) {
    fs.mkdirSync(REPO_DIR, { recursive: true });
    console.log('📥 Cloning repository...');

    await git.clone({
      fs,
      http,
      dir: REPO_DIR,
      url: REMOTE_URL,
      ref: DEFAULT_BRANCH,
      singleBranch: true,
      depth: 1,
    });

    console.log('✅ Repository cloned successfully!');
  }
};

// 🛠️ **Lấy danh sách file trong thư mục**
const listFilesInFolder = async (folderPath = '') => {
  const fullPath = path.join(REPO_DIR, folderPath);
  if (!fs.existsSync(fullPath)) throw new Error(`❌ Thư mục không tồn tại: ${folderPath}`);

  return fs.readdirSync(fullPath).map((file) => ({
    name: file,
    path: path.join(folderPath, file),
    isDirectory: fs.statSync(path.join(fullPath, file)).isDirectory(),
  }));
};

// 🛠️ **Xem nội dung file**
const previewFile = async (filePath) => {
  const fullPath = path.join(REPO_DIR, filePath);
  if (!fs.existsSync(fullPath)) throw new Error(`❌ File không tồn tại: ${filePath}`);

  return fs.readFileSync(fullPath, 'utf-8');
};

// 🛠️ **Lấy danh sách commit**
const getCommits = async () => {
  return await git.log({ fs, dir: REPO_DIR, depth: 10 });
};

// 🛠️ **Lấy danh sách branch**
const getBranches = async () => {
  return await git.listBranches({ fs, dir: REPO_DIR });
};

// 🛠️ **Tạo branch mới**
const createBranch = async (branchName) => {
  await git.branch({ fs, dir: REPO_DIR, ref: branchName });
};

// 🛠️ **Chuyển nhánh**
const switchBranch = async (branchName) => {
  await git.checkout({ fs, dir: REPO_DIR, ref: branchName });
};

// 🛠️ **Merge branch**
const mergeBranches = async (sourceBranch, targetBranch) => {
  await git.merge({
    fs,
    dir: REPO_DIR,
    ours: targetBranch,
    theirs: sourceBranch,
    fastForwardOnly: false,
  });
};

// 🛠️ **Commit thay đổi**
const commitChanges = async (commitMessage) => {
  await git.add({ fs, dir: REPO_DIR, filepath: '.' });

  await git.commit({
    fs,
    dir: REPO_DIR,
    message: commitMessage,
    author: {
      name: process.env.GIT_AUTHOR_NAME || 'Your Name',
      email: process.env.GIT_AUTHOR_EMAIL || 'your-email@example.com',
    },
  });

  console.log(`✅ Committed: "${commitMessage}"`);
};

// 🛠️ **Push thay đổi lên GitHub**
const pushChanges = async (branchName = DEFAULT_BRANCH) => {
  await git.push({
    fs,
    http,
    dir: REPO_DIR,
    remote: REMOTE_NAME,
    ref: branchName,
    onAuth: () => auth,
  });

  console.log(`🚀 Pushed changes to ${branchName}`);
};

// 🛠️ **Pull code từ remote**
const pullChanges = async (branchName = DEFAULT_BRANCH) => {
  await git.pull({
    fs,
    http,
    dir: REPO_DIR,
    remote: REMOTE_NAME,
    ref: branchName,
    onAuth: () => auth,
    author: {
      name: process.env.GIT_AUTHOR_NAME || 'Your Name',
      email: process.env.GIT_AUTHOR_EMAIL || 'your-email@example.com',
    },
  });

  console.log(`🔄 Pulled latest changes from ${branchName}`);
};

module.exports = {
  cloneRepository,
  listFilesInFolder,
  previewFile,
  getCommits,
  getBranches,
  createBranch,
  switchBranch,
  mergeBranches,
  commitChanges,
  pushChanges,
  pullChanges,
};
