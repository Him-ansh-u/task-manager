import { TASKS_API } from "@/constants/endpoints";
import { TaskSchema } from "@/types/task";
import { useState, useEffect, useCallback } from "react";

const useGetTasks = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(TASKS_API);

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.tasks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
  };
};
export default useGetTasks;
