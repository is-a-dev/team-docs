(async () => {
    try {
      var links = [];
      for (i of (await (await fetch ('https://api.github.com/repos/is-a-dev/maintainer-docs/git/trees/main?recursive=1')).json ()).tree) {
        links.push(`<a class='link row container' href='${i.path}'>${i.path}</a> \n <br> \n`);
      }

      document.getElementById ('links').innerHTML = links.join ('');
    } catch (e) {
        document.body.innerHTML = `<span class='error'>${e} <br> <br> 
        Please report this issue <a href='https://github.com/is-a-dev/maintainer-docs/issues/new?title=${e}&body=What Page Were You On When This Occured: ***${window.location.href}*** 
        <br> 
        What Was Your Error: ***${e}***'>on GitHub</a> or <a href='https://dsc.gg/is-a.dev'>on Discord</a></span>`;
        throw e;
    }
})();
