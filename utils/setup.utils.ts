import { Tunnel } from '@lambdatest/node-tunnel';

let tunnelInstance: Tunnel;

export default async function globalSetup() {
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