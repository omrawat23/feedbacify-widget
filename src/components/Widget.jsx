
import { useState } from "react";
import { MessageCircle, X, Star } from 'lucide-react';
import tailwindStyles from "../index.css?inline";
import supabase from "../supabaseClient";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      p_project_id: projectId,
      p_user_name: form.name.value,
      p_user_email: form.email.value,
      p_message: form.feedback.value,
      p_rating: rating,
    };
    const { data: returnedData } = await supabase.rpc("add_feedback", data);
    setSubmitted(true);
    console.log(returnedData);
  };

  return (
    <> <style>{tailwindStyles}</style> 
    <div className="fbw-root">

      <button className="fbw-trigger-button" onClick={() => setOpen(true)}>
        <MessageCircle className="fbw-icon" />
        feedback
      </button>
      

      {open && (
        <div className="fbw-dialog">
          <h2 className="fbw-dialog-title">
            {submitted ? "Thank you!" : "Send us your feedback"}
          </h2>

          <br></br>
          <br></br>
          {submitted ? (
            <p>We appreciate your input. It helps us improve our product and provide better service.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="fbw-form-grid">
                <div>
                  <label className="fbw-label" htmlFor="fbw-name">Name</label>
                  <input
                    id="fbw-name"
                    name="name"
                    className="fbw-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="fbw-label" htmlFor="fbw-email">Email</label>
                  <input
                    id="fbw-email"
                    name="email"
                    type="email"
                    className="fbw-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="fbw-label" htmlFor="fbw-feedback">Feedback</label>
                <textarea
                  id="fbw-feedback"
                  name="feedback"
                  className="fbw-textarea"
                  placeholder="Tell us what you think"
                  required
                />
              </div>

              <div className="fbw-button-container">
                <div className="fbw-stars-container">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`fbw-star ${rating > index ? 'active' : ''}`}
                      onClick={() => onSelectStar(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <button className="fbw-submit-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          )}

          <div className="fbw-separator"></div>
          
          <div className="fbw-footer">
            Powered by&nbsp;
            <a
              href="https://feedbackifyy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              feedbackify ⚡️
            </a>
          </div>
        </div>
      )}
    </div>
    </>
  );
};