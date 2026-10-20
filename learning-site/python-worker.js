const PYODIDE_VERSION = '314.0.7';
const CDN_ROOT = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
let runtimePromise;

async function getRuntime() {
  if (!runtimePromise) {
    importScripts(`${CDN_ROOT}pyodide.js`);
    runtimePromise = loadPyodide({ indexURL: CDN_ROOT });
  }
  return runtimePromise;
}

self.onmessage = async ({ data }) => {
  if (data.type !== 'run') return;
  try {
    const pyodide = await getRuntime();
    self.postMessage({ type: 'ready' });
    const output = [];
    pyodide.setStdout({
      batched(text) {
        if (output.join('').length < 18000) output.push(text);
      }
    });
    pyodide.setStderr({
      batched(text) {
        if (output.join('').length < 18000) output.push(text);
      }
    });
    const globals = pyodide.toPy({});
    let result;
    try {
      result = await pyodide.runPythonAsync(data.code, { globals });
    } finally {
      globals.destroy();
    }
    if (result !== undefined && result !== null) output.push(String(result));
    self.postMessage({ type: 'done', output: output.join('') || 'Code finished with no printed output.' });
  } catch (error) {
    self.postMessage({ type: 'error', output: error?.message || String(error) });
  }
};
