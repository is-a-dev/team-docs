(async () => {
  var basePath = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
    markdown,
    htmlMarkdown;
  if (basePath.endsWith(".md")) { 
    markdown = await (await fetch (`https://raw.githubusercontent.com/is-a-dev/maintainer-docs/main/${basePath}`)).text(); 
  } else { 
    markdown = await (await fetch (`https://raw.githubusercontent.com/is-a-dev/maintainer-docs/main/${basePath}.md`)).text(); 
  }
  htmlMarkdown = marked (markdown);
  document.body.innerHTML = htmlMarkdown;
})();
