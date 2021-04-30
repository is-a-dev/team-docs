(async () => {
    try {
    const githubJSON = await (await fetch ('https://api.github.com/repos/is-a-dev/maintainer-docs/git/trees/main?recursive=1')).json ();
    for (i of githubJSON.tree) {
      if (i.path.endsWith ('.md')) document.getElementById ('links').innerHTML += `<a class='link row justify-content-center' href='${i.path}'>${i.path}</a> \n <br> \n`;
    }
} catch (e) {
    document.body.innerHTML = `<span class='error'>${e}<br>Please report this issue <a href='https://github.com/is-a-dev/maintainer-docs/issues/new?title=${e}&body=What Page Were You On When This Occured: **${window.location.href}** <br> What Was Your Error: **${e}**'>on GitHub</a> or <a href='https://dsc.gg/is-a.dev'>on Discord</a></span>`
}
})();
