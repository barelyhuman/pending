import Input from "components/input";
import localforage from "localforage";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");

  useEffect(() => {
    localforage
      .getItem("tasks")
      .then((data) => {
        setTasks(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localforage
      .setItem("tasks", tasks)
      .then((_) => {
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tasks]);

  const handleEnterKey = (e) => {
    setTaskValue(e.target.value);
    if (e.keyCode === 13) {
      setTasks([...tasks, { task: e.target.value }]);
      setTaskValue("");
    }
  };

  return (
    <>
      <Input
        placeholder="What's on your mind?"
        value={taskValue}
        onChange={handleEnterKey}
        onKeyUp={handleEnterKey}
      />
      <ul>
        {tasks.map((task, index) => {
          return <li key={index}>{task.task}</li>;
        })}
      </ul>
    </>
  );
}
