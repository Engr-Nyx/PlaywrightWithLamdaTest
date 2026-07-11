import { Tunnel } from '@lambdatest/node-tunnel';

let tunnelInstance: Tunnel;

export default async function globalSetup() {
  if (process.env.HYPEREXECUTE === 'true') {
    console.log('Running on HyperExecute: skipping local tunnel startup.');
    return;
  }

  tunnelInstance = new Tunnel();

  await new Promise<void>((resolve, reject) => {
    tunnelInstance.start(
      {
        user: process.env.LT_USERNAME,
        key: process.env.LT_ACCESS_KEY,
      },
      (error) => {
        if (error) reject(error);
        else resolve();
      }
    );
  });

  (globalThis as any).__ltTunnel = tunnelInstance;
}