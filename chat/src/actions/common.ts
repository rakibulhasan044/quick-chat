"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(tag: string) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (revalidateTag as any)(tag);
}