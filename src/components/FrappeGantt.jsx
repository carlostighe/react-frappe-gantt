import React, { useEffect, useRef } from "react";

import Gantt from "frappe-gantt";
import Task from "../lib/Task.js";

function FrappeGantt({
  tasks: propsTasks,
  viewMode: propsViewMode,
  onClick,
  onViewChange,
  onProgressChange,
  onDateChange,
  onTasksChange,
}) {
  const targetRef = useRef(null);
  const svgRef = useRef(null);
  const ganttRef = useRef(null);

  const [viewMode, setViewMode] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    setViewMode(propsViewMode);
    setTasks(propsTasks.map((t) => new Task(t)));
  }, [propsTasks, propsViewMode]);

  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.refresh(tasks);
      ganttRef.current.change_view_mode(viewMode);
    }
  }, [tasks, viewMode]);

  useEffect(() => {
    ganttRef.current = new Gantt(svgRef.current, tasks, {
      on_click: onClick,
      on_view_change: onViewChange,
      on_progress_change: (task, progress) => {
        onProgressChange(task, progress);
        onTasksChange(propsTasks);
      },
      on_date_change: (task, start, end) => {
        onDateChange(task, start, end);
        onTasksChange(propsTasks);
      },
    });

    if (ganttRef.current) {
      ganttRef.current.change_view_mode(viewMode);
    }

    const midOfSvg = svgRef.current.clientWidth * 0.5;
    targetRef.current.scrollLeft = midOfSvg;

    return () => {
      if (ganttRef.current) {
        // Cleanup Gantt instance if needed
      }
    };
  }, [
    propsTasks,
    viewMode,
    onTasksChange,
    onDateChange,
    onProgressChange,
    onClick,
    onViewChange,
  ]);

  return (
    <div ref={targetRef}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </div>
  );
}

export default FrappeGantt;
