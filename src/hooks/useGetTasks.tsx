import { TASKS_API } from "@/constants/endpoints";
import { TaskSchema } from "@/types/task";
import { useState, useEffect, useCallback } from "react";

const useGetTasks = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async (showLoader: boolean = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const res = await fetch(TASKS_API, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.tasks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchTasks(true);
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
  };
};

export default useGetTasks;
