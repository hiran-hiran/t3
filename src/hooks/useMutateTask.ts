import useStore from "../store";
import { api } from "../utils/api";

export const useMutateTask = () => {
  const utils = api.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = api.todo.createTask.useMutation({
    onSuccess: (res) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        utils.todo.getTasks.setData(undefined, [res, ...prevTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = api.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        utils.todo.getTasks.setData(
          undefined,
          prevTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = api.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        utils.todo.getTasks.setData(
          undefined,
          prevTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
