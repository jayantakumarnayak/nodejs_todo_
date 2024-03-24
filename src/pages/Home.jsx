import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { TodoItem } from "../components/TodoItem";
import { context, server } from "../main";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated} =
  useContext(context);

  const updateHandler=async(id)=>{
    try {
      const {data}=await axios.put(`${server}/tasks/${id}`,
      {},
      {
        withCredentials:true,
      });
      toast(data.message);
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  const deleteHandler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/tasks/${id}`,
      {
        withCredentials:true,
      });
      toast(data.message);
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setloading(false);
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.success(error.response.data.message);
      setloading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />; 
  }

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
            <input
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
        <section className="todosContainer">
          {tasks.map((i) => (
            <TodoItem
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
              key={i._id}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
