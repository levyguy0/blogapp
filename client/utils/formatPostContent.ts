export default function formatPostContent(content: string) {
  // Replace new lines with <br>
  content = content.replaceAll("\n", "<br>");

  // Replace bold (i.e. **content** with <strong>content</strong>)
  content = content.replaceAll(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace italics (i.e. *content* with <em>content</em>)
  content = content.replaceAll(/\*(.*?)\*/g, "<em>$1</em>");

  // Replace underline (i.e. __content__ with <u>content</u>)
  content = content.replaceAll(/__(.*?)__/g, "<u>$1</u>");

  // Replace strikethrough (i.e. ~~content~~ with <s>content</s>)
  content = content.replaceAll(/~~(.*?)~~/g, "<s>$1</s>");

  // Replace code (i.e. `content` with <code>content</code>)
  content = content.replaceAll(/`(.*?)`/g, "<code>$1</code>");

  // Replace spoiler (i.e. ||content|| with <span class="spoiler">content</span>)
  content = content.replaceAll(
    /\|\|(.*?)\|\|/g,
    '<span class="spoiler">$1</span>'
  );

  return content;
}
