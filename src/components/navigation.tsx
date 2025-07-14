'use client';

import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  PanelLeft,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Logo, QuillIcon } from './icons';
import React, { useState, useEffect } from 'react';
import { Book } from '@/actions/library';
import { getBooks } from '@/actions/library';
import { SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from './ui/sidebar';
import { Shield } from 'lucide-react';


export function Navigation() {
  const pathname = usePathname();
  const [books, setBooks] = useState<Book[]>([]);
  const [openBooks, setOpenBooks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchBooks() {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      // Default all books to open
      const initialOpenState = fetchedBooks.reduce((acc, book) => {
        acc[book.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setOpenBooks(initialOpenState);
    }
    fetchBooks();
  }, [pathname]); // Refetch when path changes to see new chapters

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
                  {book.chapters.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).map(chapter => (
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
