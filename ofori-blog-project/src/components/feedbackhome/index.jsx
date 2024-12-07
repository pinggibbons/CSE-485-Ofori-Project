import React from "react";
import { useAuth } from "../../contexts/authContext";
import FeedbackCard from "../feedbackCard";
import { getFunctions, httpsCallable } from "firebase/functions";

const Home = () => {
  const [message, setMessage] = useState("Default Message");
  const { currentUser } = useAuth();

  async function callMyFunction() {
    const myFunction = httpsCallable(getFunctions(), "myFunction");
    try {
      const data = {};
      const result = await myFunction(data);
      if (result.data.success) {
        setMessage("Firebase function called successfully");
      } else {
        setMessage("Firebase function has an error");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return (
    <div className="mt-14">
      <div className="flex flex-col gap-y-2 w-fit mx-auto mt-10">
        <FeedbackCard />
      </div>
    </div>
  );
};

export default Home;
