import { FormEvent, useEffect, useState } from "react"
import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

import { Product } from "@/model/Product"

import { useCloudinary } from "@/hooks/useCloudinary"

import imgPlaceholder from '@assets/img-placeholder.png'

export interface CMSProductsSidebarProps {
    activeProduct: Partial<Product> | null,
    onCloseClick: () => void,
    createProduct: (product: Partial<Product>) => void,
    editProduct: (product: Partial<Product>) => void,
}

const initialState: Partial<Product> = { name: '', cost: 0, description: '', img: '', tmb: '' };

const CMSProductsSidebar = ({ activeProduct, onCloseClick, createProduct, editProduct }: CMSProductsSidebarProps) => {
    const [formData, setFormData] = useState<Partial<Product>>(initialState);
    const [dirty, setDirty] = useState<boolean>(false);

    const { openCloudinaryWidget } = useCloudinary();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData({ ...formData, [name]: value });
        setDirty(true);
    }

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        activeProduct?.id
            ? editProduct(formData)
            : createProduct(formData);
    }

    const uploadImage = () => {
        openCloudinaryWidget()
            .then(response => setFormData(prevFormData => ({ ...prevFormData, ...response })))
            .catch(error => console.error(error))
    }

    const isNameValid = !!formData.name.length;
    const isCostValid = formData.cost > 0;
    const isDescValid = !!formData.description.length;
    const isFormValid = isNameValid && isCostValid && isDescValid;

    useEffect(() => {
        activeProduct?.id
            ? setFormData({ ...activeProduct })
            : setFormData(initialState);
    }, [activeProduct]);

    return (
        <div className={clsx(
            "fixed bg-slate-100 text-slate-700 top-0 w-96 h-full z-10 shadow-2xl transition-all p-4 overflow-auto",
            { '-right-96': !activeProduct, 'right-0': activeProduct }
        )}>
            <div className="flex items-center justify-between">
                <p className="font-extrabold text-4xl cursive-font text-blue-600 drop-shadow-xl shadow-blue-600">
                    {activeProduct?.id ? 'Edit product' : 'Add product'}
                </p>

                <FontAwesomeIcon onClick={onCloseClick} icon={faCircleXmark} className="text-2xl text-slate-900 cursor-pointer hover:scale-110 transition-all duration-75" />
            </div>

            <form className="flex flex-col mt-12 gap-3" onSubmit={handleSave}>
                <label className="text-xl font-bold" htmlFor="img">Immagine</label>
                {
                    formData?.img ? (
                        <img src={formData.img} alt={formData.name} className="w-full rounded-xl" />
                    ) : (
                        <img src={imgPlaceholder} alt={formData.name} className="w-full rounded-xl bg-slate-300" />
                    )
                }

                <button
                    className="btn dark animated-button flex items-center justify-center gap-3"
                    onClick={uploadImage}
                    type="button"
                >
                    <FontAwesomeIcon icon={faUpload} />
                    Upload an image
                </button>

                <label htmlFor="name" className="text-xl font-bold">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    className={!isNameValid && dirty ? "p-2.5 rounded-xl error" : "p-2.5 rounded-xl"}
                />

                <label htmlFor="Cost" className="text-xl font-bold">Cost</label>
                <input
                    type="number"
                    name="cost"
                    placeholder="Product cost..."
                    value={formData.cost}
                    onChange={handleInputChange}
                    className={!isCostValid && dirty ? "p-2.5 rounded-xl error" : "p-2.5 rounded-xl"}
                />

                <label htmlFor="Description" className="text-xl font-bold">Description</label>
                <textarea
                    name="description"
                    placeholder="Product description..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className={!isDescValid && dirty ? "p-2.5 rounded-xl error" : "p-2.5 rounded-xl"}
                />

                <div className="flex justify-center mt-5">
                    <button
                        disabled={!isFormValid}
                        type="submit"
                        className="btn success animated-button text-white font-xl w-1/2 mt-4 mx-auto"
                    >
                        Save
                    </button>
                </div>

            </form>

        </div>
    )
}

export default CMSProductsSidebar