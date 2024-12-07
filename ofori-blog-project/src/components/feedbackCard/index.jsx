import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

const FeedbackCard = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validInputs = (subject, description) => {
    return subject.trim().length && description.trim().length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInputs(subject, description)) {
      const submitUserFeedbackFunction = httpsCallable(
        getFunctions(),
        "submitUserFeedback"
      );

      try {
        setLoading(true);

        const data = {
          subject,
          description,
        };

        const result = await submitUserFeedbackFunction(data);
        if (result.data.success) {
          setMessage("Feedback submitted successfully.");
        } else {
          setMessage("There is an error in submitting feedback.");
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md overflow-hidden max-w-md md:max-w-2x1">
      {message.length === 0 ? (
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-2">Subject</label>
            <input
              disabled={loading}
              type="text"
              className="shadow appearance-none border focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Description
            </label>
            <textarea
              disabled={loading}
              className="shadow appearance-none border focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <button
              disabled={loading}
              className={`${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-lg`}
              type="submit"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default FeedbackCard;
