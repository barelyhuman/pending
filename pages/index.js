import Input from "components/input";
import localforage from "localforage";
import { useState, useEffect } from "react";
import Board from "components/board";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");

  useEffect(() => {
    localforage
      .getItem("tasks")
      .then((data) => {
        const _data = reformatData(data);

        setTasks(_data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localforage
      .setItem("tasks", tasks)
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [tasks]);

  const handleEnterKey = (e) => {
    setTaskValue(e.target.value);
    if (e.keyCode === 13) {
      setTasks([...tasks, { id: uuidv4(), task: e.target.value }]);
      setTaskValue("");
    }
  };

  const reformatData = (data) => {
    if (!data) {
      return [];
    }

    return data.map((item) => {
      if (!item.id) {
        item.id = uuidv4();
      }
      return item;
    });
  };

  return (
    <>
      <Input
        placeholder="What's on your mind?"
        value={taskValue}
        onChange={handleEnterKey}
        onKeyUp={handleEnterKey}
      />
      <Board tasks={tasks} updateTasks={setTasks}></Board>
    </>
  );
}
