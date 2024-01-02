"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex gap-1 h-14 items-center justify-center rounded-md bg-muted p-1 border-b border-[#eee]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex flex-col h-14 w-[165px] rounded-[3px] items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border border-[#eee] relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:w-full data-[state=active]:after:h-px data-[state=active]:after:bg-white hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:w-full hover:after:h-px hover:after:bg-white hover:border hover:border-[#eee] hover:border-b-0 hover:text-primary transition-all",
      className,
    )}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#00a1ba"
      className="w-8 h-8 shrink-0 transition-transform duration-200 absolute -bottom-1.5"
      style={{ display: "none" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
TabsTrigger.defaultProps = {
  onMouseEnter: (e) => {
    e.currentTarget.querySelector("svg")!.style.display = "block";
  },
  onMouseLeave: (e) => {
    e.currentTarget.querySelector("svg")!.style.display = "none";
  },
};

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
