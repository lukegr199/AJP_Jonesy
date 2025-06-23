import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  inquiryType: z.string({
    required_error: "Please select an inquiry type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
  
    fetch("https://formsubmit.co/6af3dbe25bd9fc98148f268f0ff3fd11", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Form submission failed");
        return res.json();
      })
      .then(() => {
        toast({
          title: "Message sent!",
          description: "Thank you reaching out. We'll get back to you soon.",
        });
        form.reset();
      })
      .catch(() => {
        toast({
          title: "Oh damn...",
          description: "Something went wrong sending your message.",
          variant: "destructive",
        });
      })
      .finally(() => setIsSubmitting(false));
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden inputs required by FormSubmit */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
  
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  {...field}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquiry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 border-white/20 text-white">
                  <SelectItem value="fan">Fan Message</SelectItem>
                  <SelectItem value="booking">Booking Request</SelectItem>
                  <SelectItem value="press">Press Contact</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message here..."
                  className="min-h-[120px] bg-white/10 border-white/20 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );  
}
