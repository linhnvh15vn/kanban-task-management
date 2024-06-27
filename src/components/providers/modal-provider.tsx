import DeleteTaskModal from "~/components/modals/delete-task-modal";
import TaskDetailModal from "~/components/modals/task-detail-modal";
import TaskModal from "~/components/modals/task-modal";

export function ModalProvider() {
  return (
    <>
      <TaskDetailModal />
      <TaskModal />
      <DeleteTaskModal />
    </>
  );
}
