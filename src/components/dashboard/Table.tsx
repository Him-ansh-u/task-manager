import { Suspense } from "react";
import Task from "./Task";
import { TaskSchema } from "@/types/task";

type TasksTableProps = {
  tasks: TaskSchema[];
  onDelete: (id: string) => void;
};

const TasksTable = ({ tasks, onDelete }: TasksTableProps) => {
  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-3 sm:px-6 py-3 w-30 md:w-60 text-left text-sm font-semibold text-gray-900 border-b">
              Created
            </th>

            <th className="px-3 sm:px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
              Task
            </th>

            <th className="px-3 sm:px-6 py-3 w-20 text-right text-sm font-semibold text-gray-900 border-b">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-20 text-center text-gray-500">
                No tasks yet. Click &quot;New Task&quot; to create one!
              </td>
            </tr>
          ) : (
            <Suspense
              fallback={
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-gray-500">
                    Loading tasks...
                  </td>
                </tr>
              }
            >
              {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} />
              ))}
            </Suspense>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
