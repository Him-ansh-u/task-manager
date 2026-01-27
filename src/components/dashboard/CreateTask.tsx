import { FormEvent, useCallback, useState } from "react";
import Button from "../Button";

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
      console.log(title);
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });

        if (!res.ok) {
          // Try to read error message from API
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to create task");
        } else {
          refetch();
          onClose();
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("API Error:", error.message);
          throw error;
        }

        throw new Error("Something went wrong");
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
