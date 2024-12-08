import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { topNavs } from '@/data/topNav'
import { MenuIcon, MoonIcon, SunIcon } from 'lucide-react'
import React from 'react'
import DropdownItem from '../sidebar/DropdownItem'
import MenuItem from '../sidebar/MenuItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'

const TopNav: React.FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className='lg:hidden md:flex sm:flex'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={'icon'} variant={'ghost'} title='menu'>
                            <MenuIcon size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'} className='flex flex-col p-1'>
                        <SheetHeader className='px-4'>
                            <SheetTitle>
                                <div className="flex gap-2">
                                    <p className='font-extrabold text-3xl text-amber-900 p-1 bg-orange-50 w-fit rounded-lg'>OC</p>
                                </div>
                            </SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <ScrollArea className="flex-1 px-3 mb-3">
                            <div className="grid gap-2">
                                {topNavs.map((item) =>
                                    item.children ? (
                                        <DropdownItem
                                            key={item.title}
                                            item={item}
                                        />
                                    ) : (
                                        <MenuItem
                                            key={item.title}
                                            item={item}
                                        />
                                    )
                                )}
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex items-center gap-3 justify-end">
                <div className='flex items-center gap-1'>
                    <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        title='toggle-theme'
                    >
                        {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src="https://github.com/shadcn.png" alt='avatar' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-56'>
                        <DropdownMenuLabel>
                            <p>Mathew Anderson</p>
                            <p className='font-normal text-gray-400'>info@modernize.com</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="grid gap-1">
                            <DropdownMenuItem className='p-0'>
                                <Link to={'/profile'} className='rounded px-3 py-2 w-full'>
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='p-0'>
                                <Link to={'/settings'} className='rounded px-3 py-2 w-full'>
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                            <Button size="sm" variant="ghost" className='w-full justify-start text-primary hover:text-primary'>
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default TopNav