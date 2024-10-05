'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import AddPost from './AddPost'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="bg-slate-800">
        <div className="flex justify-between w-[70%] mx-auto  items-center  px-8 py-3">
            <Link className="font-bold text-white" href="/">SKCoding.</Link>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)} className="font-bold rounded-lg">Add Post</Button>
                </DialogTrigger>
                <AddPost setOpen={setOpen}/>
            
            </Dialog>
        </div>
    </nav>
  )
  }

export default Navbar