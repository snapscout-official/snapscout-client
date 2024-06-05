export async function toArrayBuffer(files: File[] | File) {
  if (!Array.isArray(files)) {
    const buffer = await files.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    return [{ bufferContent: fileBuffer, fileName: files.name }];
  }
  const result = await Promise.all(
    files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);
      return { bufferContent: fileBuffer, fileName: file.name };
    }),
  );
  return result;
}
