'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import { editPost } from './actions'
import { useRouter } from 'next/navigation'


// Define the Zod schema for validation
const FormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
})

const EditPost = ({setOpen,existing}) => {
  const { title, description ,id } = existing;
  const router = useRouter();
    const [formData, setFormData] = useState({
    title,
    description,
  })
  const [errors, setErrors] = useState({})

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Validate formData using the Zod schema
    const result = FormSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);  // Set the errors to display
      return;
    }

    // Clear any previous errors
    setErrors({});

    // If validation passes, proceed to create the post
    try {
      await editPost(formData,id);
    //   setFormData({
    //     title: "",
    // description: "",
    //   });
      
      toast({
        title: "Post Edited successfully!",
        description: "Your post has been Edited.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit post.",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Post</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Title"
              onChange={handleOnChange}
              value={formData.title}
            />
            {errors.title && <p className="text-red-500">{errors.title._errors[0]}</p>} {/* Show title error */}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              onChange={handleOnChange}
              value={formData.description}
            />
            {errors.description && <p className="text-red-500">{errors.description._errors[0]}</p>} {/* Show description error */}
          </div>
          <Button type="submit">Create Post</Button>
        </div>
      </form>
    </DialogContent>
  )
}

export default EditPost
