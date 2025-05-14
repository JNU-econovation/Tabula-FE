import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-blue-500 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        filled: "",
        line: "border",
      },
      colorScheme: {
        primary: "",
        secondary: "",
        gradient: "",
        gray: "",
      },
      size: {
        sm: "h-9 gap-1.5 px-5 has-[>svg]:px-2.5 text-sm",
        md: "h-12 px-8 py-2 has-[>svg]:px-3 text-md",
        lg: "h-16 px-12 has-[>svg]:px-4 text-xl",
        icon: "size-9",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "filled",
      colorScheme: "primary",
      size: "md",
      radius: "md",
    },
    compoundVariants: [
      {
        variant: "filled",
        colorScheme: "gradient",
        class: "bg-gradient-to-r from-[#4917FF] to-[#1761FF] text-white border-0 hover:opacity-90",
      },
      {
        variant: "line",
        colorScheme: "gradient",
        class: "border border-[#4917FF] bg-white hover:bg-[#f0f4ff] hover:text-[#3a0eff] hover:border-[#3a0eff]",
      },
      {
        variant: "filled",
        colorScheme: "primary",
        class: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
      },
      {
        variant: "line",
        colorScheme: "primary",
        class: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
      },      
      {
        variant: "line",
        colorScheme: "gray",
        class: "border-[#656565] text-[#212121] bg-white hover:bg-gray-100",
      },
      {
        variant: "filled",
        colorScheme: "secondary",
        class: "bg-[#E7EAFF] text-[#292929] hover:bg-[#DDE1FA] border-[#E7EAFF]",
      },
    ],
  }
)

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & { width?: number }>(
  ({
    className,
    variant,
    colorScheme,
    size,
    radius,
    width,
    asChild = false,
    icon,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, colorScheme, size, radius }), className) as string}
        style={width ? { width: `${width}px` } : undefined}
        {...props}
      >
        {icon && !children ? (
          <div className="flex items-center justify-center w-full h-full">{icon}</div>
        ) : (
          <>
            {icon && (
              <div
                className={cn(
                  "shrink-0",
                  variant === "line" && colorScheme === "gradient"
                    ? "text-[#4917FF]"
                    : "text-inherit"
                ) as string}
              >
                {icon}
              </div>
            )}
            <div
              className={cn(
                variant === "line" && colorScheme === "gradient"
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-[#4917FF] to-[#1761FF]"
                  : undefined
              ) as string}
            >
              {children}
            </div>
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
