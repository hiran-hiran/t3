import { signIn } from "next-auth/react";

export const Auth = () => {
  return (
    <div>
      <button
        onClick={() => signIn("github")}
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
      >
        Github Auth
      </button>
    </div>
  );
};
