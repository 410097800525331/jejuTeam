export const mountMyPageShell = async () => {
  const runtime = await import("../../components/runtime/shell-runtime.js");
  return runtime.mountPageShellBridgeRuntime();
};
