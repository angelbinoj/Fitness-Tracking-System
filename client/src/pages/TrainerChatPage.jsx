import { useParams } from "react-router-dom";
import TrainerChat from "../components/TrainerChat";

export default function TrainerChatPage() {
 const { id } = useParams();
  console.log(id);
  
  const trainer = JSON.parse(localStorage.getItem("user"));
  const trainerId = trainer._id;

  return <TrainerChat userId={id} trainerId={trainerId} />;
}
