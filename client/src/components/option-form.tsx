import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDateOptionSchema, type InsertDateOption } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";

export default function OptionForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertDateOption>({
    resolver: zodResolver(insertDateOptionSchema),
    defaultValues: {
      label: "",
      weight: 1,
      color: "#D4A574",
    },
  });

  const createOptionMutation = useMutation({
    mutationFn: async (data: InsertDateOption) => {
      const response = await apiRequest("POST", "/api/date-options", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/date-options"] });
      form.reset();
      toast({
        title: "Success!",
        description: "Date option added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add date option",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDateOption) => {
    createOptionMutation.mutate(data);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-dark-brown">Date Idea</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Movie Night" 
                      className="border-burlywood focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-dark-brown">Weight (Probability)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      placeholder="1-10"
                      className="border-burlywood focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20"
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? '' : parseInt(value) || 1);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex gap-4 items-end">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm font-medium text-dark-brown">Color</FormLabel>
                  <FormControl>
                    <Input 
                      type="color" 
                      className="h-12 border-burlywood cursor-pointer"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={createOptionMutation.isPending}
              className="bg-gradient-to-r from-warm-brown to-dark-brown text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              {createOptionMutation.isPending ? "Adding..." : "Add Option"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
