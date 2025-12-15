"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const { data: session, status } = useSession();

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  // 🔐 Auth loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  // 🔐 Not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Login to continue
        </button>
      </div>
    );
  }

  // ➕ Add task
  const addTask = async () => {
    if (!task.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task }),
    });

    setTask("");
    fetchTasks();
  };

  // ✅ Toggle task
  const toggleTask = async (id: string, completed: boolean) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });

    fetchTasks();
  };

  // ❌➡️🗑 DELETE task (FIXED)
  const deleteTask = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex justify-center">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Today’s Grind 🧠
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Logged in as <span className="font-semibold">{session.user?.email}</span>
        </p>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What are you locking in today?"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addTask}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Add
          </button>
        </div>

        {/* Tasks List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : (
          <ul className="space-y-3">
            {tasks.length === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No tasks yet. Lock one in.
              </p>
            )}

            {tasks.map((t) => (
              <li
                key={t._id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
              >
                <span
                  className={`text-sm ${
                    t.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(t._id, t.completed)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      t.completed
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {t.completed ? "Completed" : "Mark Done"}
                  </button>

                  <button
                    onClick={() => deleteTask(t._id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          I commit to execution before outcomes.
        </p>

      </div>
    </div>
  );
}
