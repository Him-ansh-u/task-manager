"use client";
import { useState, useCallback, useMemo, Suspense, useEffect } from "react";
import CreateTask from "./CreateTask";
import useGetTasks from "@/hooks/useGetTasks";
import { TASKS_API } from "@/constants/endpoints";
import { toast } from "sonner";
import Button from "../Button";
import { LuLogOut } from "react-icons/lu";
import { logoutUser } from "@/lib/auth";
import TasksTable from "./Table";

const DashboardMain = () => {
  const { tasks, loading, refetch, error } = useGetTasks();
  const [openCreateSection, setOpenCreateSection] = useState(false);
  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        toast.loading("Deleting task...", { id: "delete-task" });

        const res = await fetch(`${TASKS_API}/${id}`, {
          method: "DELETE",
          cache: "no-store",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to delete task");
        }

        toast.success("Task deleted successfully", { id: "delete-task" });

        await refetch();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went Wrong";
        toast.error(errorMessage);
      }
    },
    [refetch],
  );

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <img
          src={"/loading.gif"}
          height={50}
          width={50}
          alt="Loading"
          style={{ zIndex: 10 }}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Task Manager
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <p className="text-sm text-gray-600">Total tasks: {totalTasks}</p>

            <Button
              variant="primary"
              onClick={() => setOpenCreateSection(true)}
            >
              + New Task
            </Button>

            <Button
              variant="secondary"
              title="Logout"
              onClick={logoutUser}
              className="absolute md:relative w-12 h-12 max-md:p-0 top-4 right-4 md:top-auto md:right-auto max-md:rounded-full md:w-auto justify-center"
            >
              <LuLogOut />
            </Button>
          </div>
        </div>
      </header>

      {/* Create Form (Lazy Loaded) */}
      {openCreateSection && (
        <Suspense fallback={<div className="px-8 py-4">Loading form...</div>}>
          <CreateTask
            refetch={refetch}
            onClose={() => {
              setOpenCreateSection(false);
            }}
          />
        </Suspense>
      )}

      {/* Table */}
      <TasksTable tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardMain;
