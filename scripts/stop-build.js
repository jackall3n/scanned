function projectChanged(currentProject, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `yarn --silent nx print-affected --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();

  // get the list of changed projects from the output
  const changedProjects = JSON.parse(output).projects;

  if (changedProjects.find(project => project === currentProject)) {
    return true;
  }

  return true;
}

var hasChanged = projectChanged(
  'api',
  '1a3e1f903cf494ca0cf87e11330f47e0a147d434',
  'HEAD'
);

if (!hasChanged) {
  console.log('Build cancelled because project has not changed');
  process.exit(0);
}

// yarn build api --prod
console.log('build me');
