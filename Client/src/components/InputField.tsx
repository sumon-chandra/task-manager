import axios from "axios";
import { SyntheticEvent, useRef } from "react";
import toast from "react-hot-toast";
const InputField = () => {
  const inpRef = useRef<HTMLFormElement>(null);
  const handleAddTask = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };
    const task = {
      title: target.title.value,
      description: target.description.value,
      completed: false,
      important: false,
    };

    try {
      const response = await axios.post("http://localhost:4000/tasks", task);
      console.log(response.data);
      if (response.data.acknowledged) {
        toast.success("Task added successfully!");
        inpRef.current?.reset();
      }
    } catch (error: any) {
      toast.error("Failed to fetch:- ", error);
    }
  };

  return (
    <form
      ref={inpRef}
      onSubmit={handleAddTask}
      className="bg-transparent w-1/2 mx-auto mt-4 p-6 rounded-sm flex flex-col font-bold text-lg gap-2 "
    >
      <input
        id="task"
        type="text"
        name="title"
        placeholder="What is in your mind?"
        className="border py-2 px-3 text-sm focus:outline-none border-green-500 focus:border-2 rounded-md font-normal"
      />
      <textarea
        name="description"
        className="border py-2 px-3 text-sm border-green-500 focus:outline-none focus:border-2 rounded-md font-normal"
        cols={30}
        rows={1.5}
        placeholder="Add something"
      ></textarea>
      <input
        type="submit"
        value="Add"
        className="bg-green-500 w-40 mx-auto py-2 rounded-md hover:bg-green-400 duration-300 cursor-pointer uppercase text-xs text-white"
      />
    </form>
  );
};

export default InputField;
