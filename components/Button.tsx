import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border(gray-400 2) bg-white hover:bg-gray-100 hover:border(gray-500) disabled:text-gray-400 disabled:bg-gray-200 disabled:border(gray-300) disabled:cursor-not-allowed"
    />
  );
}
