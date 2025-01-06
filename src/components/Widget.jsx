
import { useState,useEffect } from "react";
import { MessageCircle, X } from 'lucide-react';
import tailwindStyles from "../index.css?inline";
import supabase from "../supabaseClient";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check system preference and listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
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

  const themeClass = isDark ? 'dark' : 'light';

  return (
    <div className={`fixed bottom-4 right-4 z-[99999] font-sans ${themeClass}`}>
      <button
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200
          ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}
          shadow-lg hover:-translate-y-1`}
        onClick={() => setOpen(true)}
        aria-label="Open feedback form"
      >
        <MessageCircle className="w-5 h-5" />
        feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2147483647]"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <div className={`w-[90%] max-w-md p-8 rounded-lg relative
            ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
            shadow-2xl`}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                {submitted ? "Thank you!" : "Send us your feedback"}
              </h2>

              {submitted ? (
                <p>We appreciate your input. It helps us improve our product and provide better service.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1" htmlFor="fbw-name">Name</label>
                      <input
                        id="fbw-name"
                        name="name"
                        className={`w-full p-3 rounded-lg border transition-colors
                          ${isDark ? 'bg-gray-800 border-gray-700 focus:border-blue-500' :
                            'bg-white border-gray-200 focus:border-blue-500'}`}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1" htmlFor="fbw-email">Email</label>
                      <input
                        id="fbw-email"
                        name="email"
                        type="email"
                        className={`w-full p-3 rounded-lg border transition-colors
                          ${isDark ? 'bg-gray-800 border-gray-700 focus:border-blue-500' :
                            'bg-white border-gray-200 focus:border-blue-500'}`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1" htmlFor="fbw-feedback">Feedback</label>
                    <textarea
                      id="fbw-feedback"
                      name="feedback"
                      className={`w-full p-3 rounded-lg border transition-colors min-h-[100px]
                        ${isDark ? 'bg-gray-800 border-gray-700 focus:border-blue-500' :
                          'bg-white border-gray-200 focus:border-blue-500'}`}
                      placeholder="Tell us what you think"
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110
                            ${rating > index ? 'fill-yellow-400 stroke-yellow-400' :
                              isDark ? 'stroke-white' : 'stroke-gray-900'}`}
                          onClick={() => onSelectStar(index)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <button
                      className={`px-6 py-2 rounded-lg font-medium transition-opacity hover:opacity-80
                        ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}

              <div className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

              <div className="text-center text-sm opacity-70">
                Powered by{' '}
                <a
                  href="https://feedbackifyy.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  feedbackify ⚡️
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;