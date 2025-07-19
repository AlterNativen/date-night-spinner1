import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DateOption } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function OptionList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: options = [], isLoading } = useQuery<DateOption[]>({
    queryKey: ["/api/date-options"],
  });

  const deleteOptionMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/date-options/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/date-options"] });
      toast({
        title: "Success!",
        description: "Date option removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove date option",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteOptionMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h4 className="font-semibold text-dark-brown mb-4 text-lg">Current Options:</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/80 rounded-lg p-3 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h4 className="font-semibold text-dark-brown mb-4 text-lg">Current Options:</h4>
      {options.length === 0 ? (
        <p className="text-dark-brown/60 italic">No date options yet. Add some above!</p>
      ) : (
        <ul className="space-y-3">
          {options.map((option) => (
            <li key={option.id} className="flex items-center justify-between bg-white/80 rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full shadow-sm" 
                  style={{ backgroundColor: option.color }}
                ></div>
                <span className="font-medium text-dark-brown">{option.label}</span>
                <span className="text-sm text-dark-brown/60">(Weight: {option.weight})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(option.id)}
                disabled={deleteOptionMutation.isPending}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
