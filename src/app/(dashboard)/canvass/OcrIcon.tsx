"use client"
import Scan from "@/public-assets/scan.svg";
import Image from "next/image";
import { CloudUpload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useFileButton } from "@/app/custom-hooks/useFileButton";

export default function OcrIcon() {
    const { handleButtonClick, fileInputRef, handleFileChange, selectedFile, loading, uploadFile, error } = useFileButton()
    console.log(error)

    return (
        <>
            <input className="hidden" onChange={handleFileChange} type="file" ref={fileInputRef} />
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="col-span-1 flex justify-center items-center bg-[#16EF86] rounded-full h-[40px] object-cover aspect-square">
                        <CloudUpload />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle className="font-inter font-bold text-2xl">Document Management</DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex flex-col space-y-5">
                        <div className={`border-1 flex items-center justify-center bg-white p-3 w-full h-[150px] ${error ? "border-red-300" : "border-text-secondary"}`}>
                            {selectedFile ? (
                                <div className="w-full text-text-secondary">
                                    <p className="text-center font-inter font-bold text-xl ">DOCUMENT SELECTED</p>
                                    <p className="text-center font-inter font-bold text-md">{selectedFile.name}</p>
                                </div>

                            ) : (
                                <div className="w-full text-text-secondary">
                                    <p className="text-center font-inter font-bold text-xl ">NO DOCUMENT FOUND</p>
                                    <p className="text-center font-inter font-bold text-md">Click Upload to Scan your Document</p>
                                </div>

                            )}

                        </div>
                        <p className="font-inter font-light text-sm text-center text-red-700">{error}</p>
                        <div className="flex gap-5 items-center w-full justify-center">
                            <Button className="p-7 font-inter text-text-secondary" onClick={handleButtonClick}>Select Document</Button>
                            <Button disabled={loading} className="p-7 font-inter text-text-secondary bg-secondary-foreground hover:bg-third-foreground"
                                onClick={uploadFile}
                            >
                                {loading ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please Wait
                                    </>
                                ) : "Upload Document"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    );
}
