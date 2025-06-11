"use client";

import React, { useActionState, useState } from "react";
import Combobox from "./Combobox";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch, updatePitch } from "@/lib/actions";
import { Startup } from "@/sanity/types";
import FormField from "./FormField";

const StartupForm = ({ post }: { post?: Startup }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const [form, setForm] = useState({
    title: post?.title || "",
    description: post?.description || "",
    category: post?.category || "",
    link: post?.image || "",
    pitch: post?.pitch || "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      await formSchema.parseAsync(form);

      const result = post
        ? await updatePitch(form, post._id)
        : await createPitch(prevState, formData, form.pitch);

      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: `Startup successfully ${post ? "updated" : "created"}`,
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = error.formErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Error", {
          description: "Please check your input and try again",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("Something went wrong");
      return { ...prevState, status: "ERROR", error: "Unexpected error" };
    }
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <FormField
        id="title"
        label="Title"
        placeholder="Startup Title"
        value={form.title}
        error={errors.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <FormField
        id="description"
        label="Description"
        type="textarea"
        placeholder="Startup Description"
        value={form.description}
        error={errors.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <div className="flex flex-col">
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        
        <Combobox
          value={form.category}
          onChange={(e) => handleChange("category", e)}
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <FormField
        id="link"
        label="Link"
        placeholder="Startup Image URL"
        value={form.link}
        error={errors.link}
        onChange={(e) => handleChange("link", e.target.value)}
      />

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          id="pitch"
          value={form.pitch}
          onChange={(value) => handleChange("pitch", value || "")}
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            name: "pitch",
            placeholder: "Briefly describe your idea",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending
          ? post
            ? "Updating..."
            : "Submitting..."
          : post
            ? "Update Your Pitch"
            : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
