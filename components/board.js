import Card from "./card";
import Padding from "./padding";
import Button from "./button";
import Spacer from "./spacer";
import Separator from "./separator";

const taskStatus = {
  BACKLOG: 0,
  ACTIVE: 1,
  BLOCKED: 2,
  DONE: 3,
};

export default function Board({ tasks, updateTasks }) {
  let draggingTask;

  const cardTypes = [
    {
      label: "Backlog",
      key: taskStatus.BACKLOG,
      tasks: tasks.filter(
        (item) => item.status === taskStatus.BACKLOG || !item.status
      ),
    },
    {
      label: "Active",
      key: taskStatus.ACTIVE,
      tasks: tasks.filter((item) => item.status === taskStatus.ACTIVE),
    },
    {
      label: "Blocked",
      key: taskStatus.BLOCKED,
      tasks: tasks.filter((item) => item.status === taskStatus.BLOCKED),
    },
    {
      label: "Done",
      key: taskStatus.DONE,
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

  const handleDrag = (e, taskId) => {
    draggingTask = taskId;
  };

  const handleDrop = (e, dropzoneType) => {
    moveTo(draggingTask, dropzoneType);
    draggingTask = null;
  };

  const handleDragEnd = (e) => {
    e.target.style.position = "static";
  };

  return (
    <>
      <div className="card-container">
        {cardTypes.map((item) => {
          return (
            <>
              <div
                className="drop-container"
                onDrop={(e) => handleDrop(e, item.key)}
                onDragOver={(e) => e.preventDefault()}
              >
                <h2 align="center">{item.label}</h2>
                <Separator />
                <Spacer y={1}></Spacer>
                <div>
                  {item.tasks.map((task) => {
                    return (
                      <>
                        <Card
                          draggable={true}
                          onDrag={(e) => handleDrag(e, task.id)}
                          onDragEnd={handleDragEnd}
                        >
                          <Padding all={2}>
                            <div>{task.task}</div>
                            <Spacer y={1}></Spacer>
                            <div>
                              <Button mini onClick={(e) => deleteTask(task.id)}>
                                Delete
                              </Button>
                            </div>
                          </Padding>
                        </Card>
                        <Spacer y={1}></Spacer>
                      </>
                    );
                  })}
                </div>
              </div>
              <Spacer x={3} inline />
            </>
          );
        })}
      </div>

      <style jsx>
        {`
          .card-container {
            display: flex;
            overflow-x: auto;
            max-width: 100vw;
            justify-content: center;
          }

          .drop-container {
            width: 250px;
            min-height: 100vh;
          }
        `}
      </style>
    </>
  );
}
