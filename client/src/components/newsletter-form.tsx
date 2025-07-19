import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriptionSchema, type InsertSubscription } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Heart, CheckCircle } from "lucide-react";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertSubscription>({
    resolver: zodResolver(insertSubscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: InsertSubscription) => {
      const response = await apiRequest("POST", "/api/subscriptions", data);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setShowSuccess(true);
      toast({
        title: "Welcome to our romantic community!",
        description: "You'll receive date night inspiration soon.",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
    onError: (error: any) => {
      const message = error.message?.includes("already subscribed") 
        ? "This email is already subscribed!"
        : "Failed to subscribe. Please try again.";
      
      toast({
        title: "Subscription Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSubscription) => {
    subscribeMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="px-6 py-4 rounded-full border-burlywood focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20"
                      {...field} 
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
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Email address" 
                      className="px-6 py-4 rounded-full border-burlywood focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={subscribeMutation.isPending}
            className="w-full sm:w-auto bg-gradient-to-r from-warm-brown to-dark-brown text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe for Love"}
          </Button>
        </form>
      </Form>
      
      {showSuccess && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Thank you! You'll receive romantic inspiration soon.
        </div>
      )}
    </div>
  );
}
