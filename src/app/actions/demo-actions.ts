"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { tDemo } from "@/db/schema";

export async function getDemos() {
  const demos = await db.query.tDemo.findMany({
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
  return demos;
}

export async function createDemo(formData: FormData) {
  const name = formData.get("name") as string;
  const age = Number.parseInt(formData.get("age") as string, 10);

  if (!name) throw new Error("Name is required");

  await db.insert(tDemo).values({
    id: crypto.randomUUID(),
    name,
    age: Number.isNaN(age) ? undefined : age,
  });

  revalidatePath("/");
}

export async function updateDemo(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const age = Number.parseInt(formData.get("age") as string, 10);

  if (!name) throw new Error("Name is required");

  await db
    .update(tDemo)
    .set({
      name,
      age: Number.isNaN(age) ? undefined : age,
    })
    .where(eq(tDemo.id, id));

  revalidatePath("/");
}

export async function deleteDemo(id: string) {
  await db.delete(tDemo).where(eq(tDemo.id, id));
  revalidatePath("/");
}
