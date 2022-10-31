export function download(data: string) {
  const blob = new Blob([data], { type: "application/javascript" });
  const a: any = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = new Date().getTime(); // 这里填保存成的文件名
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}
