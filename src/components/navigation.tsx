'use client';

import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Shield,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { books } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Logo, QuillIcon } from './icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [openBooks, setOpenBooks] = useState<Record<string, boolean>>(
    books.reduce((acc, book) => ({ ...acc, [book.id]: true }), {})
  );

  const toggleBook = (bookId: string) => {
    setOpenBooks(prev => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <PanelLeft />
          </Button>
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Logo className="size-6 text-primary" />
            <h1 className="font-headline text-xl font-semibold text-accent">
              ScrollScribe
            </h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/author')}
              tooltip="Author Dashboard"
            >
              <Link href="/author/dashboard">
                <QuillIcon className="size-4" />
                <span>Author Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-4 flex flex-col gap-2 p-2">
          <p className="text-xs font-medium text-muted-foreground px-2 group-data-[collapsible=icon]:hidden">
            Library
          </p>
          {books.map(book => (
            <Collapsible
              key={book.id}
              open={openBooks[book.id] || false}
              onOpenChange={() => toggleBook(book.id)}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  variant="ghost"
                  className="w-full justify-between"
                  tooltip={book.title}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen />
                    <span className="truncate">{book.title}</span>
                  </div>
                  <div className="group-data-[collapsible=icon]:hidden">
                    {openBooks[book.id] ? <ChevronDown /> : <ChevronRight />}
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {book.chapters.map(chapter => (
                    <SidebarMenuSubItem key={chapter.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === `/books/${book.id}/chapters/${chapter.id}`}
                      >
                        <Link href={`/books/${book.id}/chapters/${chapter.id}`}>
                          {chapter.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/admin')}
              tooltip="Admin Panel"
            >
              <Link href="/admin">
                <Shield />
                <span>Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
