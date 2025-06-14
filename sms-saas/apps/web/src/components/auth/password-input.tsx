"use client";
import * as React from "react";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative flex items-center">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          {...props}
          ref={ref}
        />
        <span
          className="absolute right-3 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={0}
          role="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowPassword((prev) => !prev);
            }
          }}
        >
          {showPassword ? (
            <EyeIcon />
          ) : (
            <EyeClosedIcon />
          )}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
