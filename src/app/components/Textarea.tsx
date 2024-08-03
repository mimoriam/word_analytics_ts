"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const TextareaSchema = z.object({
  text: z.string().max(10, {
    message: "Maximum 10 characters allowed",
  }),
});

export default function Textarea({}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof TextareaSchema>>({
    resolver: zodResolver(TextareaSchema),
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof TextareaSchema>> = (data) => {
    if (!data.text) {
      setWordCount(0);
      setCharCount(0);
      return;
    }
    setWordCount(data.text.trim().split(" ").length);
    setCharCount(data.text.length);
  };

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          maxLength={11}
          {...register("text", {
            onChange: (e) => {
              if (!e.target.value) {
                setWordCount(0);
                setCharCount(0);
                return;
              }
              setWordCount(e.target.value.trim().split(" ").length);
              setCharCount(e.target.value.length);
            },
          })}
        />
        {errors.text && <p>{errors.text.message}</p>}

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <br />
      {wordCount === 0 ? null : <h1>{wordCount}</h1>}
      {charCount === 0 ? null : <h1>{charCount}</h1>}
    </>
  );
}
