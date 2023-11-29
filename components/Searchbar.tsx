"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string): Boolean => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if(
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')) {
                return true;
            }
    } catch (err) {
        return false;
    }

    return false;
}

function Searchbar() {
    const [searchPrompt, setSearchPrompt] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValidLink = isValidAmazonProductURL(searchPrompt)

        if (!isValidLink) {
            return alert('Please provide a valid Amazon link');
        }

        try { 
            setIsLoading(true)
            const product = await scrapeAndStoreProduct(searchPrompt);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder='Enter product link'
                className='searchbar-input' 
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}/>
            <button
                type='submit'
                disabled={searchPrompt.length <= 3}
                className='searchbar-btn'>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
        </form>
    )
}

export default Searchbar