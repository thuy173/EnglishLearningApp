import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BellIcon } from 'lucide-react'
import React from 'react'

const Notifications: React.FC = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} title='notifications'>
                        <BellIcon size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-96 p-0'>
                    <DropdownMenuLabel>
                        <div className="flex items-center justify-between py-2 px-3">
                            <span className="text-base">Notifications</span>
                            <Badge>5 new</Badge>
                        </div>
                    </DropdownMenuLabel>
                    <ScrollArea className='h-96'>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <DropdownMenuItem key={index} className='m-0 rounded-none'>
                                <div className="flex gap-3 items-center px-3 py-1">
                                    <Avatar className='w-12 h-12'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="font-semibold">New message received!</p>
                                        <p>Salma sent you new message</p>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                    <DropdownMenuItem className='mx-3 my-2 p-0'>
                        <Button variant="outline" className='w-full'>
                            See All Notifications
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Notifications