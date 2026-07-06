import { type ComponentProps, createContext, useContext } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const DialogOpenContext = createContext(false);

export const Dialog = ({
  children,
  onOpenChange,
  open,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root>) => {
  return (
    <DialogOpenContext.Provider value={Boolean(open)}>
      <DialogPrimitive.Root data-slot="dialog" onOpenChange={onOpenChange} open={open} {...props}>
        {children}
      </DialogPrimitive.Root>
    </DialogOpenContext.Provider>
  );
};

export const DialogTrigger = (props: ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

export const DialogClose = (props: ComponentProps<typeof DialogPrimitive.Close>) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

// Animated with motion: the modal is centered by a flex container (not a
// translate transform) so motion can own `transform` for the scale/slide.
export const DialogContent = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => {
  const isOpen = useContext(DialogOpenContext);

  return (
    <AnimatePresence>
      {isOpen ? (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-background-utilities-overlay"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </DialogPrimitive.Overlay>

          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <DialogPrimitive.Content asChild forceMount {...props}>
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={cn(
                  "pointer-events-auto relative w-full max-w-lg rounded-2xl bg-background-default-default shadow-xl focus:outline-none",
                  className,
                )}
                data-slot="dialog-content"
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {children}
                <DialogPrimitive.Close className="absolute top-2 right-2 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full text-icon-default-secondary transition-colors hover:bg-background-default-secondary focus-visible:ring-4 focus-visible:ring-background-brand-default/15 focus-visible:outline-none">
                  <Icons.X />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  );
};

export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold text-text-default-default", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
};

export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-text-default-secondary", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
};
