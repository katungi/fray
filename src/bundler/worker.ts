import { Worker } from 'jest-worker';

export async function transformFile(code: string, worker: Worker) {
    //@ts-ignore
    return (await worker.transformFile(code));
}
