import { Tunnel } from '@lambdatest/node-tunnel';

export default async function globalTeardown() {
  const tunnelInstance = (globalThis as any).__ltTunnel as Tunnel | undefined;
  if (!tunnelInstance) return;

  await new Promise<void>((resolve, reject) => {
    tunnelInstance.stop((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}