"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/*
  No backend here — submitting opens the visitor's mail client with an intro
  message to the club addressed from whatever they typed.
*/
export function JoinForm() {
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent("Add me to the mailing list");
    const body = encodeURIComponent(
      `Hi ${site.name},\n\nI'd like to hear about meetings and new projects.\n\nMy email: ${email}\n`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-center"
    >
      <Label htmlFor="join-email" className="sr-only">
        Your email address
      </Label>
      <Input
        id="join-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@arizona.edu"
        className="h-auto rounded-input border-[1.5px] border-chalk bg-transparent px-8 py-6 text-body text-chalk placeholder:text-chalk/55 focus-visible:border-chalk focus-visible:ring-rain/70 md:text-body"
      />
      <Button
        type="submit"
        className="shrink-0 rounded-pill border-transparent bg-feature px-6 py-3 text-body font-normal text-chalk hover:opacity-85 focus-visible:ring-chalk/70"
      >
        Keep me posted
      </Button>
    </form>
  );
}