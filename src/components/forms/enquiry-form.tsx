"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry-schema"

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", message: "", _hp: "" },
  })

  async function onSubmit(values: EnquiryInput) {
    try {
      const response = await fetch("/api/forms/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await response.json()

      if (!response.ok || !result.ok) {
        toast.error("Something went wrong. Please try again or email us directly.")
        return
      }

      setSubmitted(true)
      toast.success("Message sent. We'll reply by email.")
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.")
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-border bg-card p-6"
      >
        <p className="font-heading text-lg font-semibold text-foreground">
          Message sent.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We’ll reply to the email address you provided.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
          {...form.register("_hp")}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="name" />
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
                <Input type="email" {...field} autoComplete="email" />
              </FormControl>
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
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Form>
  )
}
