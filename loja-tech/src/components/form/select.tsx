import { FormField, FormLabel, FormMessage } from "../ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  options: string[];
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="grid gap-2">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <select
            id={name}
            {...field}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option.toLowerCase()} >
                {option}
              </option>
            ))}
          </select>
          <FormMessage />
        </div>
      )}
    />
  );
}
