
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MessageCircle, Star } from "lucide-react"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import supabase from "../supabaseClient"


export function Widget({ projectId }) {
  const [rating, setRating] = useState(3)
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  const onSelectStar = (index) => {
    setRating(index + 1)
  }

  const submit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    
    const data = {
      p_project_id: projectId,
      p_user_name: formData.get('name'),
      p_user_email: formData.get('email'),
      p_message: formData.get('feedback'),
      p_rating: rating,
    }

    try {
      const { data: returnedData, error } = await supabase.rpc("add_feedback", data)
      
      if (error) {
        throw error
      }
      
      setSubmitted(true)
      console.log('Feedback submitted:', returnedData)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="widget">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="default" 
            className="fixed bottom-4 right-4 z-50 rounded-full transition-transform hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-foreground" overlayClassName="bg-white">
          <VisuallyHidden>
            <DialogTitle>Feedback Form</DialogTitle>
          </VisuallyHidden>
          <DialogDescription className="sr-only">
            We value your feedback. Please share your thoughts with us.
          </DialogDescription>
          <div className="w-full max-w-md rounded-lg bg-card p-6 text-card-foreground">
            {submitted ? (
              <ThankYouMessage onClose={() => setOpen(false)} />
            ) : (
              <FeedbackForm 
                onSubmit={submit} 
                rating={rating} 
                onSelectStar={onSelectStar} 
              />
            )}
            <Separator className="my-6" />
            <PoweredBy />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ThankYouMessage({ onClose }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-primary">Thank you for your feedback!</h3>
      <p className="mt-4 text-muted-foreground">
        We appreciate your input. It helps us improve our product and provide better
        service to our customers.
      </p>
      <Button 
        className="mt-6" 
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  )
}

function FeedbackForm({ onSubmit, rating, onSelectStar }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary">Send us your feedback</h3>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <FormField label="Name" id="name" placeholder="Enter your name" />
        <FormField label="Email" id="email" type="email" placeholder="Enter your email" />
        <FormField 
          label="Feedback" 
          id="feedback" 
          as={Textarea} 
          placeholder="Tell us what you think" 
          className="min-h-[100px]" 
        />
        <div className="flex items-center justify-between">
          <StarRating rating={rating} onSelectStar={onSelectStar} />
          <Button 
            type="submit" 
  
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

function FormField({ label, id, as: Component = Input, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground">{label}</Label>
      <Component id={id} name={id} required className="bg-background text-foreground border-input" {...props} />
    </div>
  )
}

function StarRating({ rating, onSelectStar }) {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-6 w-6 cursor-pointer ${
            rating > index ? "fill-primary text-primary" : "text-muted-foreground"
          }`}
          onClick={() => onSelectStar(index)}
        />
      ))}
    </div>
  )
}

function PoweredBy() {
  return (
    <div className="text-center text-sm text-muted-foreground">
      Powered by{" "}
      <a
        href="https://feedbacify-landing.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:underline"
      >
        feedbacify ⚡️
      </a>
    </div>
  )
}