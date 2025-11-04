import React, { useRef, useState } from "react"
import { uploadDocument } from "../actions/document"
import { useToast } from "@/components/ui/use-toast"



export const useFileButton = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const dismiss = () => (document.querySelector('[data-state="open"]') as HTMLDivElement).click()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedFile(file)
            console.log("Selected file:", file);
        }
    }
    const uploadFile = async () => {

        if (!selectedFile) {
            setError("No file detected, please upload file first")
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append('document', selectedFile)

        const result = await uploadDocument(formData)
        if (!result.success) {
            setLoading(false)
            setError(result.message)
            return
        }

        setError(null)
        setLoading(false)
        dismiss()
        toast({
            title: "File Uploaded",
            description: "Document successfully uploaded into server",
            variant: "default",
        })

    }

    return {
        fileInputRef, handleButtonClick, handleFileChange, selectedFile, loading, uploadFile, error
    }
}
