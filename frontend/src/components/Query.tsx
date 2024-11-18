import { useState } from "react"; // Import useState
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Query = () => {
  const [email, setEmail] = useState(""); // Initialize state with default values
  const [query, setQuery] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !query) {
      toast.error("Please fill in all fields.");
      return;
    }

    const res = await axios.post(`${BACKEND_URL}/user/addQuery`,{email,query}); 
    if(res.status == 200) {
      setEmail("");
      setQuery("");
      toast.success("Query send successfully");
    }
    else toast.error("Some error occured");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">
      <div>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-Montserrat">
          For Any Query
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="p-5 flex flex-col gap-7">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="w-[500px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state
          />
          <div className="grid w-full gap-5">
            <label htmlFor="query" className="sr-only">
              Message
            </label>
            <Textarea
              id="query"
              placeholder="Type your message here."
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update state
            />
            <Button type="submit">Send Message</Button>
          </div>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Query;
