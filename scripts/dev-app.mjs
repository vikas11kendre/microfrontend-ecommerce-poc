const app = process.argv[2] ?? process.env.APP;

if (!app) {
  console.error('Usage: npm run dev:app -- <app-name>');
  console.error('Example: npm run dev:app -- remote-products');
  console.error('Alternative: APP=remote-products npm run dev:app');
  process.exit(1);
}

const { spawn } = await import('node:child_process');

const child = spawn('npm', ['run', 'dev', '-w', `packages/${app}`], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  }

  process.exit(code ?? 1);
});
