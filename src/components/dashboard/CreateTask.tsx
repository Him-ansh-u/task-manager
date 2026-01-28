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
  const [isLoading, setIsLoading]= useState(false)

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
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

        await new Promise((r) => setTimeout(r, 150));

        await refetch();
        onClose();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
        setTitle("");
      }
    },
    [title, onClose, refetch],
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-in fade-in zoom-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create new task
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              maxLength={80}
            />

            <div className="flex gap-2 justify-end">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>

              <Button variant="primary" type="submit" isLoading={isLoading}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
