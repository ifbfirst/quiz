export function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export const getMinutesSeconds = (seconds: number) => {
  const secText = (seconds % 60).toString().padStart(2, '0');
  const minText = Math.trunc(seconds / 60)
    .toString()
    .padStart(2, '0');
  return { secText, minText };
};
