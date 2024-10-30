import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle, Star } from "lucide-react";
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
      <style>
        {`
          .fbw-root {
            --fbw-background: hsl(0 0% 100%);
            --fbw-foreground: hsl(222.2 84% 4.9%);
            --fbw-primary: hsl(222.2 47.4% 11.2%);
            --fbw-primary-foreground: hsl(210 40% 98%);
            --fbw-muted: hsl(210 40% 96.1%);
            --fbw-muted-foreground: hsl(215.4 16.3% 46.9%);
            --fbw-border: hsl(214.3 31.8% 91.4%);
            --fbw-radius: 0.5rem;
            
            position: fixed;
            bottom: 4rem;
            right: 4rem;
            z-index: 50;
          }

          .fbw-root.dark {
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

          .fbw-form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .fbw-star {
            cursor: pointer;
            width: 1.25rem;
            height: 1.25rem;
            transition: transform 0.2s;
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
        `}
      </style>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="fbw-trigger-button">
            <MessageCircle className="h-5 w-5" />
            Feedback
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {submitted ? "Thank you!" : "Send us your feedback"}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We appreciate your input. It helps us improve our product and provide better service.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="fbw-form-grid">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Tell us what you think"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="fbw-button-container">
                <div className="fbw-stars-container">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`fbw-star ${rating > index ? 'active' : ''}`}
                      onClick={() => onSelectStar(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectStar(index);
                        }
                      }}
                      aria-label={`Rate ${index + 1} stars`}
                    />
                  ))}
                </div>
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}

          <Separator className="my-4" />
          
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
        </DialogContent>
      </Dialog>
    </div>
  );
};