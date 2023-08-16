import { useEffect, useState } from "react";

export const Spinner = () => {
    const [isSpinnerShown, setIsSpinnerShown] = useState<boolean>(false);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setIsSpinnerShown(true)
        }, 300);

        return () => clearTimeout(debounce);
    }, []);

    return (
        isSpinnerShown && (
            <div className="flex w-full  justify-center items-center">
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        )
    )
}
