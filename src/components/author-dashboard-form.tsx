"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { generateChapterSummary, GenerateChapterSummaryInput } from "@/ai/flows/generate-chapter-summary";
import { Sparkles } from "lucide-react";
import { saveChapter } from "@/actions/author";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  summary: z.string().optional(),
});

export function AuthorDashboardForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSaving, startSavingTransition] = useTransition();
  const [isGenerating, startGeneratingTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
    },
  });

  const chapterContent = form.watch("content");
  const chapterTitle = form.watch("title");

  const handleGenerateSummary = () => {
    const content = form.getValues("content");
    if (content.length < 50) {
      toast({
        title: "Content Too Short",
        description: "Please write at least 50 characters before generating a summary.",
        variant: "destructive",
      });
      return;
    }

    startGeneratingTransition(async () => {
      try {
        const input: GenerateChapterSummaryInput = { chapterContent: content };
        const result = await generateChapterSummary(input);
        if (result.summary) {
          form.setValue("summary", result.summary);
          toast({
            title: "Summary Generated",
            description: "AI-powered summary has been created successfully.",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to generate summary.",
          variant: "destructive",
        });
      }
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    startSavingTransition(async () => {
        try {
            await saveChapter(values);
            toast({
                title: "Chapter Saved!",
                description: `Your chapter "${values.title}" has been saved.`,
            });
            form.reset();
            // Refresh the page to see the new chapter in the sidebar
            router.refresh(); 
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to save chapter.",
                variant: "destructive",
            });
        }
    });
  }

  const isPending = isSaving || isGenerating;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Title</FormLabel>
                <FormControl>
                  <Input placeholder="The Shadow's Advance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The air grew cold as a hush fell over the tavern..."
                    className="min-h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Chapter Summary (Optional)</FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleGenerateSummary}
                    disabled={isPending}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="A brief summary of the chapter's key events."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>{isSaving ? "Saving..." : "Save Chapter"}</Button>
        </form>
      </Form>
      <div className="space-y-6">
        <h3 className="text-lg font-medium font-headline">Live Preview</h3>
        <Card className="min-h-[400px] border-dashed">
          <CardHeader>
            <CardTitle className="font-headline text-accent">
              {chapterTitle || "Chapter Title"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{chapterContent || "Start writing to see your chapter preview here."}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
