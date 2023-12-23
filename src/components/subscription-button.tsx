"use client";

import { useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";


type SubscriptionButtonProps = {
  isPro: boolean;
}
export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.open(response.data.url, "_blank");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong"
      })
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={onClick} disabled={loading} size="sm" variant={isPro ? "default" : "premium"}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  )
}