import { memo } from "react";
import { LuTrash2 } from "react-icons/lu";
import { TaskSchema } from "@/types/task";
import dynamic from "next/dynamic";

const Time = dynamic(() => import("./Time"), {
  loading: () => "-",
  ssr: false,
});

const Task = ({
  task,
  onDelete,
}: {
  task: TaskSchema;
  onDelete: (id: string) => void;
}) => {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
      {/* Created At */}
      <td className="px-3 sm:px-6 py-3 text-sm text-gray-900 ">
        <Time iso={task.created_at} />
      </td>

      {/* Task Name */}
      <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 whitespace-normal break-words">
        {task.title}
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-6 py-3 text-right">
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors inline-flex items-center justify-center"
          title="Delete task"
        >
          <LuTrash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default memo(Task);
