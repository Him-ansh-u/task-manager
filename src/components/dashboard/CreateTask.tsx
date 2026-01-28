import { FormEvent, useCallback, useState } from "react";
import Button from "../Button";
import { TASKS_API } from "@/constants/endpoints";
import { toast } from "sonner";

const CreateTask = ({
  refetch,
  onClose,
}: {
  refetch: () => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        toast.loading("Creating task...", { id: "create-task" });

        const res = await fetch(TASKS_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
          cache: "no-store",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to create task");
        }

        await res.json();

        toast.success("Task created successfully", { id: "create-task" });

        // small delay avoids backend consistency race
        await new Promise((r) => setTimeout(r, 150));

        await refetch();
        onClose();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        toast.error(errorMessage);
      } finally {
        setTitle("");
      }
    },
    [title, onClose, refetch],
  );

  return (
    <div className="bg-blue-50 border-b border-blue-200 px-8 py-4">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <Button variant="primary" type="submit">
          Create
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
