export function formatPostContent(content: string) {
  content = content.replace(/<\/?[^>]+(>|$)/g, "");

  content = content.replaceAll("\n", "<br>");

  content = content.replaceAll(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  content = content.replaceAll(/\*(.*?)\*/g, "<em>$1</em>");

  content = content.replaceAll(/__(.*?)__/g, "<u>$1</u>");

  content = content.replaceAll(/~~(.*?)~~/g, "<s>$1</s>");

  content = content.replaceAll(/`(.*?)`/g, "<code>$1</code>");

  content = content.replaceAll(
    /\|\|(.*?)\|\|/g,
    '<span class="spoiler">$1</span>'
  );

  return content;
}

export const insertText = (
  symbol: string,
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>
) => {
  const anchor = window.getSelection()?.anchorNode as HTMLElement;

  const classList = anchor.classList;
  let textarea = document.getElementById(
    "content-editor"
  ) as HTMLTextAreaElement;

  if (!window.getSelection()?.toString()) return;
  if (!anchor || !classList.contains("blog-content")) return;
  if (textarea) {
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    let selectedText;
    let before;
    let after;

    selectedText = content.substring(startPos, endPos);
    before = content.substring(0, startPos);
    after = content.substring(endPos);

    setContent(before + symbol + selectedText + symbol + after);
  }
};
