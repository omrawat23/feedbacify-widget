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
    <>
      <style>{tailwindStyles}</style>
      <div className="fixed bottom-4 right-4 z-50">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105 transition-transform">
              <MessageCircle className="mr-2 h-5 w-5" />
              Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background">
            {submitted ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
                <p className="text-muted-foreground">
                  We appreciate your input. It helps us improve our product and provide better
                  service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-4">Send us your feedback</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 cursor-pointer ${
                            rating > index 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-muted-foreground"
                          }`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <Button type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            )}
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://feedbackifyy.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
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