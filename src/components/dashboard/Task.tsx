import { memo } from "react";
import { LuTrash2 } from "react-icons/lu";
import { TaskSchema } from "@/types/task";

const Task = ({
  task,
  onDelete,
}: {
  task: TaskSchema;
  onDelete: (id: string) => void;
}) => {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
      <td className="px-8 py-4 text-gray-900">{task.title}</td>
      <td className="px-8 py-4 text-right">
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors inline-flex items-center justify-center"
          title="Delete task"
        >
          <LuTrash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default memo(Task);
