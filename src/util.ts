
export function downloadURI(content: string, fileName: string, contentType: string) {
    const link = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }