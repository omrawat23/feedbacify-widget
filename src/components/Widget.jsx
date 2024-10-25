import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import tailwindStyles from "../index.css?inline";
import supabase from "../supabaseClient";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      p_project_id: projectId,
      p_user_name: form.name.value,
      p_user_email: form.email.value,
      p_message: form.feedback.value,
      p_rating: rating,
    };
    const { data: returnedData, error } = await supabase.rpc("add_feedback", data);
    setSubmitted(true);
    console.log(returnedData);
  };

  return (
    <>  
    <style>{tailwindStyles}</style>
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full shadow-lg hover:scale-105">
            <MessageCircleIcon className="mr-2 h-5 w-5" />
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white p-6">
          {submitted ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
              <p className="mt-4">
                We appreciate your feedback. It helps us improve our product and provide better
                service to our customers.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-6">Send us your feedback</h3>
              <form
                className="space-y-6"
                onSubmit={submit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-gray-600">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback" className="text-sm text-gray-600">Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think"
                    className="w-full border rounded-md p-2 min-h-[100px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-6 w-6 cursor-pointer ${
                          rating > index 
                            ? "fill-yellow-400 stroke-yellow-400" 
                            : "fill-gray-200 stroke-gray-200"
                        }`}
                        onClick={() => onSelectStar(index)}
                      />
                    ))}
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          )}
          <Separator className="my-4" />
          <div className="text-gray-500 text-sm text-center">
            Powered by{" "}
            <a
              href="https://feedbackifyy.vercel.app/"
              target="_blank"
              className="text-gray-900 hover:underline"
            >
              feedbackify ⚡️
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
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
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}