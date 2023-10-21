import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FetchOptions {
  url: string;
  type?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  data?: { [key: string]: any };
}
export async function Fetch({ url, data, type = "GET" }: FetchOptions) {
  let _url = url;

  if (type === "GET") {
    data && (_url += "?" + new URLSearchParams(data).toString());
  } else {
    _url = url;
  }

  const options = {
    method: type,
  };
  if (type !== "GET") {
    Object.assign(options, { body: JSON.stringify(data || {}) });
  }

  return fetch(_url, options)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        toast({ description: data.message, variant: "destructive" });
        location.href = "/login";
        return;
      } else {
        return data.data;
      }
    })
    .catch((error) => {
      toast({
        description: error?.message ?? "Register error.",
        variant: "destructive",
      });
      return;
    });
}
