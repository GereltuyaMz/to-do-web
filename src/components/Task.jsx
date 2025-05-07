const Task = (props) => {
  const isDone = props.status === "active" ? false : true;

  return (
    <div
      key={props.id}
      className="rounded-md bg-[#F3F4F6] p-4 flex justify-between items-center text-sm"
    >
      <div className="flex gap-[10px] items-center">
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={isDone}
          onChange={() => {
            props.toggleStatus(props.id);
          }}
        />
        <p>{props.text}</p>
      </div>
      <button
        onClick={() => props.deleteTask(props.id)}
        className="w-[67px] h-[30px] text-[#EF4444] bg-[#FDF2F2] rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
