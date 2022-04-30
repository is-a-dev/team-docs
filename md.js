"use strict";

import "./marked.js";
import "./prism.js";

document.addEventListener("DOMContentLoaded", async () => {
    let basePath = window.location.pathname
        .substring(0, window.location.pathname.lastIndexOf("/") + 1)
        .replace(/\.[^/.]+$/, "");
    let file = await fetch(
        `https://raw.githubusercontent.com/is-a-dev/maintainer-docs/main/${basePath}.md?_=${Date.now()}`
    );
    if (file.status === 404) {
        file = await fetch(
            `https://raw.githubusercontent.com/is-a-dev/maintainer-docs/main/${basePath}?_=${Date.now()}`
        ).then((res) => res.text());
    } else if (file.status !== 200) {
        file = `Non 200 Response Code, The Respose Code Is: ${file.status}`;
    } else {
        file = await file.text();
    }

    if (window.location.pathname.startsWith("/raw/")) {
        raw("html");
    } else {
        document.getElementById("rawButton").href = "/raw/" + basePath;
    }
});
