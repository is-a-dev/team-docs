"use strict";

document.addEventListener("DOMContentLoaded", async () => {
    /**
     * const headers = {
        Authorization: `token ${(
            await fetch(
                "https://raw.githubusercontent.com/is-a-dev/maintainer-docs/gh-pages/token.txt"
            ).then((r) => r.text())
        ).replace(/\-/g, "")}`,
    };
     */

    let links = [];

    // list the documentation
    for (const i of (
        await fetch(
            "https://api.github.com/repos/is-a-dev/maintainer-docs/git/trees/main?recursive=1" // ,{ headers }
            
        ).then((res) => res.json())
    ).tree) {
        links.push(
            `<a class='link' href='${i.path}'>${i.path}</a><br>`
        );
    }

    document.getElementById("links").innerHTML = links.join("\n");

    // list the maintainers on the bottom
    for (const i of await (
        await fetch("https://api.github.com/orgs/is-a-dev/members")
        /**
         * , {
            headers,
        }
         */
    ).json()) {
        document.getElementById("maintainers").innerHTML += `
        <div class='maintainer'>
          <a href='${i.html_url}'>
            <img src='${i.avatar_url}' alt='${i.login}'s User Profile Image'></img>
            <span>${i.login}</span>
          </a>
        </div>`;
    }
});
