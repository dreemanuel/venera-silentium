import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex w-full rounded-lg bg-tea-green/20 p-1 ${className || ""}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`
      flex-1 inline-flex items-center justify-center whitespace-nowrap
      rounded-md px-3 py-2 text-sm font-heading font-medium text-paynes-gray/70
      ring-offset-cornsilk transition-all
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paynes-gray focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50
      data-[state=active]:bg-cornsilk data-[state=active]:text-paynes-gray
      data-[state=active]:shadow-sm
      ${className || ""}
    `}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`
      mt-6 ring-offset-cornsilk
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paynes-gray focus-visible:ring-offset-2
      ${className || ""}
    `}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
