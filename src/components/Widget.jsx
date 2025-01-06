
import { useState,useEffect } from "react";
import { MessageCircle, X } from 'lucide-react';
import tailwindStyles from "../index.css?inline";
import supabase from "../supabaseClient";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const handleClose = () => {
    setOpen(false);
    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleBackdropClick = (e) => {
    // Only close if the backdrop itself is clicked
    if (e.target === e.currentTarget) {
      handleClose();
    }
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

    try {
      const { data: returnedData } = await supabase.rpc("add_feedback", data);
      setSubmitted(true);
      setTimeout(handleClose, 2000);
      console.log(returnedData);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };


  return (
    <>
      <style>{tailwindStyles}</style>
      <div className={`fbw-root ${isDark ? 'fbw-dark' : ''}`}>
        <button
          className="fbw-trigger-button"
          onClick={() => setOpen(true)}
          aria-label="Open feedback form"
        >
          <MessageCircle className="fbw-icon" />
          <span>Feedback</span>
        </button>

        {open && (
          <div
            className="fbw-dialog-backdrop"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
          >
            <div className="fbw-dialog">
              <button
                onClick={handleClose}
                className="fbw-close-button"
                aria-label="Close dialog"
              >
                <X className="fbw-icon" />
              </button>

              <div className="fbw-dialog-header">
                <h2 className="fbw-dialog-title">
                  {submitted ? "Thank you!" : "Share Your Feedback"}
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <p className="text-lg">We appreciate your feedback!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your input helps us improve our service.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="fbw-form-grid">
                      <div className="space-y-2">
                        <label className="fbw-label" htmlFor="fbw-name">
                          Name
                        </label>
                        <input
                          id="fbw-name"
                          name="name"
                          className="fbw-input"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="fbw-label" htmlFor="fbw-email">
                          Email
                        </label>
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

                    <div className="space-y-2">
                      <label className="fbw-label" htmlFor="fbw-feedback">
                        Your Feedback
                      </label>
                      <textarea
                        id="fbw-feedback"
                        name="feedback"
                        className="fbw-textarea"
                        placeholder="Tell us what you think..."
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
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <button type="submit" className="fbw-submit-button">
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                )}

                <div className="fbw-separator" />

                <div className="fbw-footer">
                  Powered by{" "}
                  <a
                    href="https://feedbackifyy.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    feedbackify ⚡️
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}