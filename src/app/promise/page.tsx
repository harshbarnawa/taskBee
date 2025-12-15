"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LockingIn() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    if (checked) {
      router.push("/tasks");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Lock In Mode 🔒
        </h1>

        <p className="text-center text-gray-600 mb-8">
          This is a promise to yourself. No shortcuts. No excuses. Just grind.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>• I will show up daily, no excuses.</li>
  <li>• I will stay disciplined when motivation fades.</li>
  <li>• I will execute relentlessly and stop waiting for perfect.</li>
  <li>• I will focus on actions, not distractions.</li>
  <li>• I will protect my time like my future depends on it.</li>
  <li>• I will outwork my past self.</li>
  <li>• I will stay consistent even when results are slow.</li>
  <li>• I will earn the life I want through effort.</li>
          </ul>
        </div>

        <label className="flex items-start gap-3 mb-8 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-blue-600"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            I promise myself to lock in, stay disciplined, and put in the work —
            even when it’s uncomfortable.
          </span>
        </label>

        <button
          onClick={handleConfirm}
          disabled={!checked}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition shadow-md ${
            checked
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
        >
          Manage Your Tasks
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          I commit to the grind before chasing outcomes.
        </p>

      </div>
    </div>
  );
}
