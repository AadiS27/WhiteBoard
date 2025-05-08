"use client";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useState,useEffect,ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import qs from "query-string";


export const SearchInput = () => {
    const router=useRouter();

    const [searchValue,setSearchValue]=useState<string>("");
    const [debouncedValue]=useDebounceValue(searchValue,500);

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setSearchValue(e.target.value);
    }

    useEffect(()=>{
        const url= qs.stringifyUrl({
            url:'/',
            query:{
                search:debouncedValue,
            }
        },{skipEmptyString:true,skipNull:true});
        router.push(url);
    },[debouncedValue,router])
    
    return (
        <div className="w-full relative">
           <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
           <Input className="w-full  pl-9" placeholder="Search" onChange={handleChange}/>
        </div>
    );
}