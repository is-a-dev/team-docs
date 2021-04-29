export default async function getMarkdown (url) {
  const markdown = await (await fetch (url)).text();
  const htmlMarkdown = marked (markdown);
  console.log(markdown);
  console.log(htmlMarkdown);
  document.body.innerHTML = htmlMarkdown;
}
