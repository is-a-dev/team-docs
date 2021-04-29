(async () => {
  const githubJSON = await (await fetch ('https://api.github.com/repos/is-a-dev/maintainer-docs/git/trees/main?recursive=1')).json ();
  for (i of githubJSON.tree) {
    if (i.path.endsWith ('.md')) document.getElementById ('links').innerHTML += `<a class='link row' href='${i.path}'>${i.path}</a> \n <br> \n`;
  }
})();
