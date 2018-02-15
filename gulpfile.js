const { spawn } = require('child_process');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const path = require('path');

const consoleLog = data => gutil.log(data.toString().trim());

gulp.task('server', () => nodemon({
  script: './bin/www',
  watch: ['./src'],
  env: {
    DEBUG: 'server:server',
    NODE_PATH: path.resolve(__dirname, 'server'),
    NODE_ENV: 'development',
  },
}));


gulp.task('mongo', (callback) => {
  const dbProcess = spawn('mongod');
  dbProcess.stderr.on('data', consoleLog);
  dbProcess.on('close', (code) => {
    consoleLog(`Database was stopped with code ${code}`);
    callback();
  });
});

gulp.task('run:dev', ['mongo', 'server']);
