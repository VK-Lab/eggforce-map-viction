export const fetchWASM = async (filename: string) => {
  if (!filename) {
    throw new Error('Missing filename');
  }

  return fetch(`${process.env.PUBLIC_URL}/${filename}`, {
    headers: {
      'Content-Type': 'application/wasm',
    },
  })
    .then((response) => response.arrayBuffer())
    .then((bytes) => new Uint8Array(bytes));
};
