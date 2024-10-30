
import { useState } from "react";
import { MessageCircle } from 'lucide-react';
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
    <div className="fbw-root">
      <style>{`
        .fbw-root {
          --fbw-background: hsl(0 0% 100%);
          --fbw-foreground: hsl(222.2 84% 4.9%);
          --fbw-primary: hsl(222.2 47.4% 11.2%);
          --fbw-primary-foreground: hsl(210 40% 98%);
          --fbw-muted: hsl(210 40% 96.1%);
          --fbw-muted-foreground: hsl(215.4 16.3% 46.9%);
          --fbw-border: hsl(214.3 31.8% 91.4%);
          --fbw-radius: 0.5rem;
          
          all: initial;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: fixed;
          bottom: 4rem;
          right: 4rem;
          z-index: 9999;
        }

        .fbw-root * {
          all: unset;
          box-sizing: border-box;
        }

        .fbw-root.fbw-dark {
          --fbw-background: hsl(222.2 84% 4.9%);
          --fbw-foreground: hsl(210 40% 98%);
          --fbw-primary: hsl(210 40% 98%);
          --fbw-muted: hsl(217.2 32.6% 17.5%);
          --fbw-muted-foreground: hsl(215 20.2% 65.1%);
          --fbw-border: hsl(217.2 32.6% 17.5%);
        }

        .fbw-trigger-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--fbw-primary);
          color: var(--fbw-primary-foreground);
          border-radius: 9999px;
          font-weight: 500;
          transition: transform 0.2s;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .fbw-trigger-button:hover {
          transform: scale(1.05);
        }

        .fbw-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--fbw-background);
          color: var(--fbw-foreground);
          padding: 1.5rem;
          border-radius: var(--fbw-radius);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          width: 90%;
          max-width: 425px;
        }

        .fbw-dialog-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .fbw-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .fbw-label {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .fbw-input,
        .fbw-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--fbw-border);
          border-radius: var(--fbw-radius);
          background: var(--fbw-background);
          color: var(--fbw-foreground);
        }

        .fbw-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .fbw-star {
          cursor: pointer;
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.2s;
          fill: none;
          stroke: currentColor;
        }

        .fbw-star:hover {
          transform: scale(1.1);
        }

        .fbw-star.active {
          fill: #facc15;
          color: #facc15;
        }

        .fbw-footer {
          text-align: center;
          font-size: 0.875rem;
          color: var(--fbw-muted-foreground);
          margin-top: 1rem;
        }

        .fbw-footer a {
          color: var(--fbw-primary);
          text-decoration: none;
        }

        .fbw-footer a:hover {
          text-decoration: underline;
        }

        .fbw-button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .fbw-stars-container {
          display: flex;
          gap: 0.5rem;
        }

        .fbw-submit-button {
          background: var(--fbw-primary);
          color: var(--fbw-primary-foreground);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--fbw-radius);
          cursor: pointer;
          font-weight: 500;
        }

        .fbw-separator {
          height: 1px;
          background: var(--fbw-border);
          margin: 1rem 0;
        }
      `}</style>
      <style>{`
  .fbw-root {
    --fbw-background: hsl(0 0% 100%);
    --fbw-foreground: hsl(222.2 84% 4.9%);
    --fbw-primary: hsl(222.2 47.4% 11.2%);
    --fbw-primary-foreground: hsl(210 40% 98%);
    --fbw-muted: hsl(210 40% 96.1%);
    --fbw-muted-foreground: hsl(215.4 16.3% 46.9%);
    --fbw-border: hsl(214.3 31.8% 91.4%);
    --fbw-radius: 0.5rem;
  }

  .fbw-trigger-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--fbw-primary);
    color: var(--fbw-primary-foreground);
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .fbw-trigger-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .fbw-icon {
    width: 20px;
    height: 20px;
  }

  .fbw-dialog {
    background: var(--fbw-background);
    color: var(--fbw-foreground);
    padding: 2rem;
    border-radius: var(--fbw-radius);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .fbw-input,
  .fbw-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--fbw-border);
    border-radius: var(--fbw-radius);
    background: var(--fbw-background);
    color: var(--fbw-foreground);
    transition: border-color 0.2s;
  }

  .fbw-input:focus,
  .fbw-textarea:focus {
    outline: none;
    border-color: var(--fbw-primary);
  }

  .fbw-submit-button {
    background: var(--fbw-primary);
    color: var(--fbw-primary-foreground);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--fbw-radius);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  .fbw-submit-button:hover {
    opacity: 0.9;
  }
`}</style>

      <button className="fbw-trigger-button" onClick={() => setOpen(true)}>
        <MessageCircle className="fbw-icon" />
        Feedback
      </button>

      {open && (
        <div className="fbw-dialog">
          <h2 className="fbw-dialog-title">
            {submitted ? "Thank you!" : "Send us your feedback"}
          </h2>

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
            Powered by{" "}
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
  );
};