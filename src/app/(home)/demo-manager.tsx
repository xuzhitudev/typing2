"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createDemo, deleteDemo, updateDemo } from "@/app/actions/demo-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";

// type Demo = {
//   id: string;
//   name: string;
//   age: number | null;
//   createdAt: Date;
//   updatedAt: Date;
// };

export function DemoManager() {
  const [editId, setEditId] = useState<string | null>(null);

  const trpc = useTRPC();
  const { data: demos = [] } = useSuspenseQuery(trpc.getDemos.queryOptions());

  return (
    <div className="mt-10 w-full max-w-2xl rounded-xl border bg-card p-6 text-left text-card-foreground shadow-sm">
      <h2 className="mb-6 font-bold text-2xl">CRUD Demo</h2>

      {/* Create Form */}
      <form
        action={createDemo}
        className="mb-8 flex items-end gap-3 rounded-lg bg-muted/30 p-4"
      >
        <div className="grid flex-1 gap-1.5">
          <label className="font-medium text-sm" htmlFor="name">
            Name
          </label>
          <Input
            className="bg-background"
            name="name"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="grid w-24 gap-1.5">
          <label className="font-medium text-sm" htmlFor="age">
            Age
          </label>
          <Input
            className="bg-background"
            name="age"
            placeholder="Age"
            type="number"
          />
        </div>
        <Button type="submit">Add New</Button>
      </form>

      {/* List */}
      <div className="space-y-3">
        {demos.map((demo) => (
          <div
            className="flex items-center justify-between rounded-lg border bg-card p-3 transition-shadow hover:shadow-sm"
            key={demo.id}
          >
            {editId === demo.id ? (
              <form
                action={async (formData) => {
                  await updateDemo(demo.id, formData);
                  setEditId(null);
                }}
                className="flex flex-1 items-center gap-2"
              >
                <Input
                  className="h-9 flex-1"
                  defaultValue={demo.name}
                  name="name"
                />
                <Input
                  className="h-9 w-20"
                  defaultValue={demo.age?.toString()}
                  name="age"
                  type="number"
                />
                <div className="flex gap-2">
                  <Button size="sm" type="submit">
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditId(null)}
                    size="sm"
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                    {demo.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{demo.name}</span>
                    <span className="text-muted-foreground text-xs">
                      Age: {demo.age ?? "-"} • Created:{" "}
                      {new Date(demo.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditId(demo.id)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <form action={deleteDemo.bind(null, demo.id)}>
                    <Button size="sm" type="submit" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        ))}
        {demos.length === 0 && (
          <div className="rounded-lg border border-dashed bg-muted/20 py-8 text-center text-muted-foreground">
            No records found. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
