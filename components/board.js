import Card from "./card";
import Padding from "./padding";
import Button from "./button";

const taskStatus = {
  BACKLOG: 0,
  ACTIVE: 1,
  BLOCKED: 2,
  DONE: 3,
};

export default function Board({ tasks, updateTasks }) {
  const cardTypes = [
    {
      label: "Backlog",
      tasks: tasks.filter(
        (item) => item.status === taskStatus.BACKLOG || !item.status
      ),
    },
    {
      label: "Active",
      tasks: tasks.filter((item) => item.status === taskStatus.ACTIVE),
    },
    {
      label: "Blocked",
      tasks: tasks.filter((item) => item.status === taskStatus.BLOCKED),
    },
    {
      label: "Done",
      tasks: tasks.filter((item) => item.status === taskStatus.DONE),
    },
  ];

  const moveTo = (taskId, status) => {
    const _tasks = tasks.map((item) => {
      if (item.id === taskId) {
        item.status = status;
      }
      return item;
    });

    updateTasks(_tasks);
  };

  const deleteTask = (taskId) => {
    const _tasks = tasks.filter((item) => {
      return item.id !== taskId;
    });

    updateTasks(_tasks);
  };

  return (
    <>
      {cardTypes.map((item) => {
        return (
          <>
            <h2>{item.label}</h2>
            <div>
              {item.tasks.map((task) => {
                return (
                  <Card>
                    <Padding all={1}>
                      <div>{task.task}</div>
                      <div>
                        <Button
                          onClick={(e) => moveTo(task.id, taskStatus.ACTIVE)}
                        >
                          Move to Active
                        </Button>
                        <Button
                          onClick={(e) => moveTo(task.id, taskStatus.DONE)}
                        >
                          Move to Done
                        </Button>
                        <Button
                          onClick={(e) => moveTo(task.id, taskStatus.BLOCKED)}
                        >
                          Move to Blocked
                        </Button>
                        <Button
                          onClick={(e) => moveTo(task.id, taskStatus.BACKLOG)}
                        >
                          Move to Backlog
                        </Button>
                        <Button onClick={(e) => deleteTask(task.id)}>
                          Delete
                        </Button>
                      </div>
                    </Padding>
                  </Card>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
