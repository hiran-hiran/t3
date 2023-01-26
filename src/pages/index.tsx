import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Layout } from "../components/Layout";
import { Auth } from "../components/Auth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut()
      .then((v) => console.log(v))
      .catch((e) => alert(e));
  };

  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <Layout title="Todo">
      <ArrowLeftOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-blue-600"
        onClick={handleSignOut}
      />
      <p className="textblue600 my-3 text-xl">{session.user?.name}</p>

      <TaskForm />
      <TaskList />
    </Layout>
  );
};

export default Home;
