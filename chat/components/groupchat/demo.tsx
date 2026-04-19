"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/src/validations/groupChatValidation";

export default function CreateChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (data: createChatSchemaType) => {
    setLoading(true);
    console.log(data);

    // simulate api
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline">Create Group</Button>}
      />

      <DialogContent className="sm:max-w-sm">
        {/* ✅ form MUST be inside DialogContent */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create your new chat</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Passcode</Label>
              <Input {...register("passcode")} />
              {errors.passcode && (
                <p className="text-red-500 text-sm">
                  {errors.passcode.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Cancel</Button>}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "processing" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}