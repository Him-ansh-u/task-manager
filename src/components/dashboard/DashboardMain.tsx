"use client";
import { useState, useCallback, useMemo, Suspense } from "react";
import CreateTask from "./CreateTask";
import Task from "./Task";
import useGetTasks from "@/hooks/useGetTasks";
import { TASKS_API } from "@/constants/endpoints";

const DashboardMain = () => {
  const { tasks, loading, refetch, error } = useGetTasks();
  const [isCreating, setIsCreating] = useState(false);
  console.log(loading, error)

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const handleDelete = useCallback(async(id:string) => {
    try {
      const res = await fetch(`${TASKS_API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to delete task");
      }else{
        refetch()
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Delete error:", error.message);
        throw error;
      }

      throw new Error("Something went wrong while deleting");
    }
  }, [refetch]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">Total tasks: {totalTasks}</p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + New Task
            </button>
          </div>
        </div>
      </header>

      {/* Create Form (Lazy Loaded) */}
      {isCreating && (
        <Suspense fallback={<div className="px-8 py-4">Loading form...</div>}>
          <CreateTask
            refetch={refetch}
            onClose={() => {
              setIsCreating(false);
            }}
          />
        </Suspense>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                Task Name
              </th>
              <th className="px-8 py-4 text-right text-sm font-semibold text-gray-900 border-b w-32">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-8 py-24 text-center text-gray-500"
                >
                  No tasks yet. Click &quot;New Task&quot; to create one!
                </td>
              </tr>
            ) : (
              <Suspense
                fallback={
                  <tr>
                    <td className="px-8 py-4">Loading tasks...</td>
                  </tr>
                }
              >
                {tasks.map((task) => (
                  <Task key={task.id} task={task} onDelete={handleDelete} />
                ))}
              </Suspense>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMain;
