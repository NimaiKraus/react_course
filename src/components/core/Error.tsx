import { useEffect, useState } from "react";

export const Error = ({ errorMessage }: { errorMessage?: string }) => {
  const [isErrorShown, setIsErrorShown] = useState<boolean>(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setIsErrorShown(true)
    }, 300);

    return () => clearTimeout(debounce);
  }, []);

  return (
    isErrorShown && (
      <div className="bg-red-600 text-white text-xl font-bold rounded-2xl p-3 m-6">
        <p className="text-center">{errorMessage ? errorMessage : 'Oops, an error occurred!'}</p>
      </div>
    )
  )
}
