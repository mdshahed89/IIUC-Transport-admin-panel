"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Button from "./Button";

export default function Error({ error }) {
  const reset = () => {};

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </Button>
    </div>
  );
}
