import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { ReactNode } from "react";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
}
export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  required = true,
  icon,
}: InputFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-foreground">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {icon}
                </div>
              )}
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className="bg-netflix-dark border-netflix-gray text-foreground pl-10"
                required={required}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
