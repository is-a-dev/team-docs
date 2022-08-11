document.addEventListener("DOMContentLoaded", async () => {
    let links = document.getElementById("links");

    // list the documentation
    for (const file of (
        await fetch(
            "https://api.github.com/repos/is-a-dev/team-docs/git/trees/main?recursive=1"
        ).then((res) => res.json())
    ).tree) {
        links.innerHTML += `<a class="link" href="https://github.com/is-a-dev/team-docs/blob/main/${file.path}">${file.path}</a>`;
    }

    // list the team members on the bottom
    for (const member of await fetch(
        "https://api.github.com/orgs/is-a-dev/members"
    ).then((res) => res.json())) {
        document.getElementById("team").innerHTML += `
        <div class="member">
          <a target="_blank" href="${member.html_url}">
            <img src="${member.avatar_url}" alt="${member.login}" />
            <span>${member.login}</span>
          </a>
        </div>`;
    }
});
