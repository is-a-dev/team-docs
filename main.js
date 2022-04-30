'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    try {
      var links = [];

      // list the documentation
      for (const i of (await (await fetch ('https://api.github.com/repos/is-a-dev/maintainer-docs/git/trees/main?recursive=1')).json ()).tree) {
        links.push (`<a class='link row container' href='${i.path}'>${i.path}</a>
        <br>`);
      }

      document.getElementById ('links').innerHTML = links.join ('\n');

      // list the maintainers on the bottom
      for (const i of (await (await fetch ('https://api.github.com/orgs/is-a-dev/members', {
        method: 'GET',
        headers: {
          'Authorization': `token ${process.env.GH_TOKEN}`
        }
      })).json ())) {
        document.getElementById ('contributers').innerHTML += `
        <div class='column maintainer'>
          <a href='${i.html_url}'>
            <img src='${i.avatar_url}' alt='${i.login}'s User Profile Image'></img>
            <span>${i.login}</span>
          </a>
        </div>`;
      }

    } catch (e) {
        document.body.innerHTML = `<span class='error'>${e} <br> <br> 
            Please report this issue <a href='https://github.com/is-a-dev/maintainer-docs/issues/new?title=${e}&body=What Page Were You On When This Occured: ***${window.location.href}*** <br> What Was Your Error: ***${e}***'>
              on GitHub
            </a> or <a href='https://dsc.gg/is-a.dev'>
              on Discord
              </a>
          </span>`;
        throw e;
    }
});
