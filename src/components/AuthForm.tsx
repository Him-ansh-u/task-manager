import Link from "next/link";
import InputField from "./InputField";

type AuthType = "login" | "signup";

type ValuesType = { email: string; password: string };

interface AuthFormProps {
  type: AuthType;
  values: ValuesType;
  onChange: (key: keyof ValuesType, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  error?: string;
}

export default function AuthForm({
  type,
  values,
  onChange,
  onSubmit,
  isLoading = false,
  error,
}: AuthFormProps) {
  const isLogin = type === "login";
  const { email, password } = values || {};

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <p className="text-gray-600 mt-2">Welcome back</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full md:w-96">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          {isLogin ? "Log in" : "Create account"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => onChange("email", e?.target?.value || "")}
            placeholder="you@example.com"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => onChange("password", e?.target?.value || "")}
            placeholder="••••••••"
          />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
                ? "Log in"
                : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link href={"/signup"} className="text-blue-600 font-medium">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href={"/login"} className="text-blue-600 font-medium">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
