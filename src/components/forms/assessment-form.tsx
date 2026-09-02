"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  assessmentSchema,
  type AssessmentInput,
} from "@/lib/validation/assessment-schema"
import { ENQUIRY_TRIGGERS, SECTORS, TIMELINE_OPTIONS } from "@/lib/constants"

export function AssessmentForm() {
  const [submitted, setSubmitted] = useState(false)
  // z.coerce.number() gives the schema a different input type (raw form
  // value, pre-coercion) than output type (parsed AssessmentInput) -- the
  // three type params tell react-hook-form about that split so onSubmit
  // receives the coerced/output shape.
  const form = useForm<
    z.input<typeof assessmentSchema>,
    unknown,
    z.output<typeof assessmentSchema>
  >({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      company: "",
      sector: "",
      numberOfSites: 1,
      trigger: undefined,
      timeline: "",
      _hp: "",
    },
  })

  async function onSubmit(values: AssessmentInput) {
    try {
      const response = await fetch("/api/forms/assessment", {
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
      toast.success("Assessment request received. We'll be in touch shortly.")
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
          Request received.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We’ll follow up by email to scope the assessment.
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
        {/* Honeypot: hidden from real users, only bots fill it in. */}
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
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work email</FormLabel>
              <FormControl>
                <Input type="email" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="organization" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector.slug} value={sector.slug}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfSites"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of sites</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={500}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  value={(field.value as number | string | undefined) ?? ""}
                  onChange={(event) => field.onChange(event.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What triggered this enquiry?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the main driver" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ENQUIRY_TRIGGERS.map((trigger) => (
                    <SelectItem key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timeline</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMELINE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending…" : "Book an assessment"}
        </Button>
      </form>
    </Form>
  )
}
