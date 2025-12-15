import Link from "next/link";

export default function LockIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-xl text-center bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hold on 👀
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          You don’t unlock <span className="font-semibold">progress</span> by clicking buttons.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <p className="text-gray-700 text-base">
            📈 <span className="font-semibold">Mehnat to kar fir progress dekhna.</span><br />
            Lock in. Grind. Execute.  
            <br />
            Analytics comes after action.
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Only click if you’re ready to promise yourself that you’ll lock in and grind.

        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Go Back
          </Link>

          <Link
            href="/promise"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            I’m Locked In 🔒
          </Link>
        </div>

      </div>
    </div>
  );
}
